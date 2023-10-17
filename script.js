let entities = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < 10; i++) {
        entities.push(new Entity(random(width), random(height), 'plant'));
    }
    for (let i = 0; i < 5; i++) {
        entities.push(new Sheep(random(width), random(height)));
    }
    for (let i = 0; i < 3; i++) {
        entities.push(new Wolf(random(width), random(height)));
    }
}

function draw() {
    background(220);
    for (let i = entities.length - 1; i >= 0; i--) {
        entities[i].display();
        entities[i].update();
        if (entities[i].type === 'sheep' || entities[i].type === 'wolf') {
            entities[i].commonReproduceBehavior(); // Call the common reproduction behavior
            entities[i].commonEatBehavior(entities); // Call the common eat behavior
        }
        if (entities[i].isDead()) {
            entities.splice(i, 1);
        }
    }
}
class Entity {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.size = 10;
        this.type = type;
        this.energy = this.type === 'plant' ? 0 : 100; // Set initial energy
        this.lastReproductionTime = millis();
    }

    display() {
        if (this.type === 'plant') {
            fill(0, 255, 0); // Green for plants
        } else if (this.type === 'sheep') {
            fill(255, 255, 0); // Yellow for sheep
        } else if (this.type === 'wolf') {
            fill(128); // Gray for wolves
        }
        square(this.x, this.y, this.size);
    }

    isDead() {
        return this.energy <= 0;
    }

    update() {
        if (this.type !== 'plant') {
            this.energy -= 0.1; // Energy is spent every frame
        }
    }

    moveTowards(target) {
        let directionX = Math.sign(target.x - this.x);
        let directionY = Math.sign(target.y - this.y);
        let newX = this.x + directionX * this.size;
        let newY = this.y + directionY * this.size;
        if (newX >= 0 && newX <= width && newY >= 0 && newY <= height) {
            this.x = newX;
            this.y = newY;
        }
    }

    commonEatBehavior(target) {
        if (this.canEat(target)) {
            this.gainEnergy(target);
            this.onEat(target);
        }
    }

    commonReproduceBehavior() {
        if (millis() - this.lastReproductionTime >= this.reproduceDelay) {
            for (let entity of entities) {
                if (entity.type === this.type && entity !== this && this.canReproduce(entity)) {
                    this.createOffspring(entity);
                    this.lastReproductionTime = millis();
                }
            }
        }
    }

    canEat(target) {
        return false; // Override in specific entity classes
    }

    canReproduce(entity) {
        return false; // Override in specific entity classes
    }

    gainEnergy(target) {
        this.energy += target.getEnergyValue();
    }

    createOffspring(entity) {
        // Override in specific entity classes
    }

    onEat(target) {
        // Override in specific entity classes
    }

    getEnergyValue() {
        return 0; // Override in specific entity classes
    }
}

class Sheep extends Entity {
    constructor(x, y) {
        super(x, y, 'sheep');
        this.reproduceDelay = random(5000, 10000); // Delay between reproductions (5-10 seconds)
    }

    canEat(target) {
        return this.type === 'sheep' && target.type === 'plant' && dist(this.x, this.y, target.x, target.y) < this.size / 2;
    }

    getEnergyValue() {
        return 50;
    }

    createOffspring(entity) {
        entities.push(new Sheep(this.x, this.y));
    }
}

class Wolf extends Entity {
    constructor(x, y) {
        super(x, y, 'wolf');
        this.reproduceDelay = random(3000, 5000); // Delay between reproductions (3-5 seconds)
    }

    canEat(target) {
        return this.type === 'wolf' && target.type === 'sheep' && dist(this.x, this.y, target.x, target.y) < this.size;
    }

    getEnergyValue() {
        return 100;
    }

    createOffspring(entity) {
        entities.push(new Wolf(this.x, this.y));
    }

    move() {
        let targetSheep = this.findNearestSheep();
        if (targetSheep) {
            this.moveTowards(targetSheep);
        }
    }

    findNearestSheep() {
        let closestSheep = null;
        let closestDistance = Infinity;
        for (let entity of entities) {
            if (entity.type === 'sheep') {
                let d = dist(this.x, this.y, entity.x, entity.y);
                if (d < closestDistance) {
                    closestDistance = d;
                    closestSheep = entity;
                }
            }
        }
        return closestSheep;
    }
}
