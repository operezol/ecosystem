let entities = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < 10; i++) {
        entities.push(new Entity(random(width), random(height)));
    }
}

function draw() {
    background(220);

    for (let i = entities.length - 1; i >= 0; i--) {
        entities[i].display();
        if (!entities[i].isPlant && entities[i].readyToGrow()) {
            entities[i].becomePlant();
        }
        entities[i].spread();
        if (!entities[i].isPlant && !entities[i].isSeed) {
            // Remove entities that are not plants and not seeds
            entities.splice(i, 1);
        }
    }
}

class Entity {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 10;
        this.isPlant = false;
        this.startTime = millis();
        this.isSeed = true;
    }

    display() {
        if (this.isPlant) {
            fill(0, 255, 0); // Green
        } else {
            fill(255, 255, 0); // Yellow
        }
        square(this.x, this.y, this.size);
    }

    readyToGrow() {
        return !this.isPlant && millis() - this.startTime > 1000 && random(1) < 0.75 && !this.hasEntityAtPosition();
    }

    hasEntityAtPosition() {
        for (let entity of entities) {
            if (entity !== this && entity.isPlant && entity.x === this.x && entity.y === this.y) {
                return true;
            }
        }
        return false;
    }

    becomePlant() {
        this.isPlant = true;
        this.size = 20; // Plant size
        this.isSeed = false; // Mark it as not a seed
    }

    spread() {
        if (this.isPlant && random(1) < 0.02) {
            let newX = this.x + round(random(-1, 1)) * this.size;
            let newY = this.y + round(random(-1, 1)) * this.size;
            if (!this.hasEntityAtPosition()) {
                entities.push(new Entity(newX, newY));
            }
        }
    }
}
