// globals
const CARD_COUNT = 144;
const CARD_TRANSFER_INTERVAL = 1000; // milliseconds
var cards = [];
var transit_cards = [];
var time_elapsed = 0; // milliseconds
var current_card = CARD_COUNT - 1;
var time_elapsed = 0;

// setup pixijs
var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor : 0x0});
document.body.appendChild(app.view);

// static position frame rate counter
var frame_rate = new PIXI.Text('FPS: 0', {fontFamily : 'Arial', fontSize: 24, fill : 0xFFFFFF});
frame_rate.x = 10;
frame_rate.y = 10;
app.stage.addChild(frame_rate);

// Initialize CARD_COUNT Card objects
for (let i = 0; i < CARD_COUNT; i++) {
    let y = app.screen.height - (i << 1) - 10;
    cards.push(new Card(20, y, 'imgs/trapcard.png')); // img location is used init a sprite
    app.stage.addChild(cards[i].sprite);
}

var time_last = new Date();
var last_second = 1;
function game_loop() {
    // update FPS
    let time_now = new Date();
    time_elapsed += time_now - time_last;
    time_last = time_now;
    frame_rate.text = "FPS: " + app.ticker.FPS.toFixed(2);

    // move a card every second
    if (time_elapsed > (last_second * CARD_TRANSFER_INTERVAL) && current_card >= 0) {
        last_second++;
        // top card in array moves to a new pile every 2 seconds
        transit_cards.push(cards[current_card]);
        current_card--;
    }
    for (let i = 0; i < transit_cards.length; i++) {
        transit_cards[i].move();
    }
}

app.ticker.add(game_loop);
