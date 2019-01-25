// setup
var app = new PIXI.Application(window.screen.width, window.screen.height, {backgroundColor : 0x0});
document.body.appendChild(app.view);

// create a 144 sprites from image path
var cards = [];
for (let i = 0; i < 144; i++) {
    cards.push(PIXI.Sprite.fromImage('imgs/trapcard.png'));
    cards[i].x = (app.screen.width / 4) - (i >> 1);
    cards[i].y = (app.screen.height / 2) - (i << 1);
    app.stage.addChild(cards[i]);
}
