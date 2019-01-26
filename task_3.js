const PARTICLES_COUNT = 100;
var fire_particles = [];
var inner_fparticles = [];

class FireParticle {
    constructor (x, y, color, r) {
        this.x = x;
        this.y = y;
        this.w = r;
        this.h = r;
        this.alpha = random(280, 200);
        this.vx = random(-0.1, 0.1);
        this.vy = random(-1, -5);
        this.color = color;
    }

    update() {
        this.y += this.vy;
        this.x += this.vx;
        this.vy *= 1.01;
        this.h += 0.5;
        this.alpha -= 4;
        if (this.w - (this.w / 20) < 0) {
            this.w = 0;
        } else {
            this.w -= this.w / 25;
        }
    }

    update_inner() {
        this.y += this.vy;
        this.x += this.vx;
        this.vx *= 1.01;
        this.vy *= 1.01;
        this.h += 0.5;
        this.alpha -= 5;
        if (this.w - (this.w / 15) < 0) {
            this.w = 0;
        } else {
            this.w -= this.w / 15;
        }
    }

    render() {
        noStroke();
        fill(this.color[0], this.color[1], this.color[2], this.alpha);
        ellipse(this.x, this.y, this.w, this.h);
        fill(255, 255, 255, 10);
        noStroke();
        ellipse(this.x, this.y, this.w + 2, this.h + 2);
    }
}


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    // create fire elements
    for (let i = 0; i < PARTICLES_COUNT; i++) {
        fire_particles.push(new FireParticle(-200, -200, [255, 0, 0], 60));
        fire_particles[fire_particles.length - 1].vx = random(-11.2, 11.2);
        fire_particles[fire_particles.length - 1].vy = random(-11, -12);
        fire_particles[fire_particles.length - 1].alpha = random(0, 200);
        inner_fparticles.push(new FireParticle(-200, -200, [255, 155, 0], 20));
        inner_fparticles[inner_fparticles.length - 1].vx = random(-11, 11);
        inner_fparticles[inner_fparticles.length - 1].vy = random(-15, -12);
        inner_fparticles[inner_fparticles.length - 1].alpha = random(0, 200);
    }
}

function draw() {
    // update fire particles
    for (let i = fire_particles.length - 1; i >= 0; i--) {
        fire_particles[i].update();
        inner_fparticles[i].update_inner();
        // if a particle is no longer visible, replace it
        if (fire_particles[i].alpha <= 0) {
            fire_particles.splice(i, 1);
            fire_particles.push(new FireParticle(width/2, height/2, [255, 0, 0], 60));
            fire_particles[fire_particles.length - 1].vx = random(-1.2, 1.2);
            fire_particles[fire_particles.length - 1].vy = random(-3, -2);
        }
        if (inner_fparticles[i].alpha <= 0) {
            inner_fparticles.splice(i, 1);
            inner_fparticles.push(new FireParticle(width/2, height/2, [255, 155, 0], 20));
            inner_fparticles[fire_particles.length - 1].vx = random(-1, 1);
            inner_fparticles[fire_particles.length - 1].vy = random(-5, -2);
        }
    }

    background(0);
    // render fire particles, outter before inner
    for (let i = 0; i < fire_particles.length; i++) {
        fire_particles[i].render();
    }
    for (let i = 0; i < inner_fparticles.length; i++) {
        inner_fparticles[i].render();
    }

    // fire wood
    rectMode(CENTER);
    stroke(0);
    fill(100, 50, 0);
    rect(width/2, height/2 + 20, 100, 20);
    translate(width/2, height/2 + 10);
    rotate(Math.PI / 10);
    rect(0, 0, 80, 20);
    rotate(-Math.PI / 5);
    rect(0, 0, 80, 20);
}
