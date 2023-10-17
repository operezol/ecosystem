let seeds = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < 10; i++) {
        seeds.push(new Seed(random(width), random(height));
    }
}

function draw() {
    background(220);
    for (let i = seeds.length - 1; i >= 0; i--) {
        seeds[i].display();
        seeds[i].spread();
    }
}

class Seed {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 10;
    }

    display() {
        fill(255, 255, 0); // Yellow
        square(this.x, this.y, this.size);
    }

    spread() {
        if (random(1) < 0.02) {
            seeds.push(new Seed(this.x + round(random(-1, 1)) * this.size, this.y + round(random(-1, 1)) * this.size));
        }
    }
}
