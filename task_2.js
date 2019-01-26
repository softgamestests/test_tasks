// globals
const STR_SIZE_MIN = 3;
const STR_SIZE_MAX = 13;
const STR_REPLACE_WEIGHT = 0.50;
const COMBINATION_CHANGE_INTERVAL = 1000;
const char_pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // You could add more, but need more images then
var display_string = "";
var display_imgs = [];
var rendered_text = null;

// setup pixijs
var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor : 0xFFFFFF});
document.body.appendChild(app.view);

// static position frame rate counter
var frame_rate = new PIXI.Text('FPS: 0', {fontFamily : 'Arial', fontSize: 24, fill : 0x0});
frame_rate.x = 10;
frame_rate.y = 10;
app.stage.addChild(frame_rate);

function getRandomArbitraryInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function pick_string() {
    display_string = "";
    let char_count = getRandomArbitraryInt(STR_SIZE_MIN, STR_SIZE_MAX);
    for (let  i = 0; i < char_count; i++) {
        display_string += char_pool.charAt(Math.floor(Math.random() * char_pool.length));
    }
    console.log("full string: " + display_string);
    // replace some letters randomly
    display_imgs = [];
    for (let i = 0; i < display_string.length; i++) {
        if (Math.random() < STR_REPLACE_WEIGHT) {
            display_imgs.push({
                    char:display_string[i],
                    index: i,
                    sprite: PIXI.Sprite.fromImage("imgs/letters/" + display_string[i] + ".png"),
                });
            // we won't render spaces
            display_string = display_string.substr(0,i) + "@" + display_string.substr(i+1);
        }
    }
    console.log("replaced ver: " + display_string);
}

function render_string() {
    // get font size
    let str_len = display_string.length;
    let font_w = 0;
    let font_h = 0;
    let r_size = 0;
    // pick a random font size that fits the screen
    while((display_string.length * 10) < app.screen.width) {
        r_size = getRandomArbitraryInt(30, 300);
        let test = new PIXI.Text('@', {fontFamily : 'Arial', fontSize: r_size, fill : 0x0});
        test.x = -800;
        //app.stage.addChild(test);
        if (str_len * test.width <= app.screen.width) {
            font_w = test.width;
            font_h = test.height;
            break;
        }
    }
    rendered_text = new PIXI.Text(display_string, {fontFamily : 'Arial', fontSize: r_size, fill : 0x0});
    //rendered_text.anchor.set(0, 0.5);
    rendered_text.x = 10;
    rendered_text.y = app.screen.height / 2;
    app.stage.addChild(rendered_text);
    //console.log(display_string);
    let j = 0;
    for (let i = 0; i < display_string.length; i++) {
        if (display_string[i] == "@") {
            // lets render this image
            display_imgs[j].sprite.width = font_w;
            display_imgs[j].sprite.height = font_h;
            let test = new PIXI.Text(display_string.substr(0, i), {fontFamily : 'Arial', fontSize: r_size, fill : 0x0});
            display_imgs[j].sprite.x = i == 0 ? 10 : test.width + 10;
            display_imgs[j].sprite.y = (app.screen.height / 2);
            app.stage.addChild(display_imgs[j].sprite);
            app.stage.setChildIndex(display_imgs[j].sprite, 2);
            j++;
        }
    }
}


var time_elapsed = 0;
var time_last = new Date();
var last_second = 1;
pick_string();
render_string();
function update_text_imgs() {
    //update fps
    let time_now = new Date();
    time_elapsed += time_now - time_last;
    time_last = time_now;
    frame_rate.text = "FPS: " + app.ticker.FPS.toFixed(2);

    if (time_elapsed > (last_second * COMBINATION_CHANGE_INTERVAL)) {
        for (var i = 0; i < display_imgs.length; i++) {
            app.stage.removeChild(display_imgs[i].sprite);
        }
        app.stage.removeChild(rendered_text);
        pick_string();
        render_string();
        last_second++;
    }
}

app.ticker.add(update_text_imgs);
