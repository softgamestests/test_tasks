class Card {
    constructor(x, y, img) {
        this.sprite = PIXI.Sprite.fromImage(img);
        this.sprite.anchor.set(1, 1);
        this.sprite.height = (app.screen.height/6) > 200 ? 200 : (app.screen.height/6);
        this.sprite.width = this.sprite.height / 1.5;
        this.sprite.x = x + this.sprite.width;
        this.sprite.y = y;
        this.fx = 0; // final destination position
        this.fy = 0;
        this.speedx = 0; // x speed in pixels
        this.speedy = 0;
        this.prepare = false;
    }

    prepare_move(i) {
        // figure out final position of card, given index of card
        this.fx = app.screen.width - 20;
        this.fy = app.screen.height - 10 - ((CARD_COUNT - i) << 1);

        // figure out how fast card needs to go to read destination in 2 seconds
        let distancex = this.fx - this.sprite.x;
        let distancey = this.fy - this.sprite.y;
        this.speedx = distancex / (app.ticker.FPS * 2);
        this.speedy = distancey / (app.ticker.FPS * 2);
        this.prepared = true;
        // moving card should have the highest draw priority
        app.stage.setChildIndex(this.sprite, CARD_COUNT);
    }

    move() {
        // figure out speed
        if (!this.prepared)
            this.prepare_move(current_card);
        // animate
        if (this.sprite.x + this.speedx < this.fx) {
            this.sprite.x += this.speedx;
            this.sprite.y += this.speedy;
        } else if (this.sprite.x == this.fx) {
            return;
        } else {
            // last movement
            this.sprite.x = this.fx;
            this.sprite.y = this.fy;
        }
    }
}
