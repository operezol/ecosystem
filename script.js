let rainDrops = [];
let fertilizers = [];
let plants = [];
let wolves = [];
let sheeps = [];
let seeds = [];
let iterations = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let index = 0; index < 1000; index++) {
        rainDrops.push(new RainDrop(random(width), random(height), 20));
        seeds.push(new Seed(random(width), random(height)));
        plants.push(new Plant(random(width), random(height)));
    }
    for (let index = 0; index < 200; index++) {
        sheeps.push(new Sheep(random(width), random(height)));
        wolves.push(new Wolf(random(width), random(height)));
    }
}

function draw() {
    background(220);
    fertilizers.forEach((fertilizer) => {
        fertilizer.updateAndDisplay();
    });
    rainDrops.push(new RainDrop(random(width), random(height), 20));
    rainDrops.forEach((rainDrop) => {
        rainDrop.updateAndDisplay();
    });
    plants.forEach((plant) => {
        plant.updateAndDisplay();
    });
    seeds.forEach((seed) => {
        seed.updateAndDisplay();
    });
    sheeps.forEach((sheep) => {
        sheep.updateAndDisplay();
    });
    wolves.forEach((wolf) => {
        wolf.updateAndDisplay();
    });
    iterations++;
    let totalMassFertilizer = fertilizers.reduce(
        (total, obj) => total + obj.size,
        0
    );
    let totalMassWater = rainDrops.reduce((total, obj) => total + obj.size, 0);
    let totalMassPlants = plants.reduce((total, obj) => total + obj.size, 0);
    let totalMassSeeds = seeds.reduce((total, obj) => total + obj.size, 0);
    let totalMassSheeps = sheeps.reduce((total, obj) => total + obj.size, 0);
    let totalMassWolves = wolves.reduce((total, obj) => total + obj.size, 0);
    fill(0);
    rect(0, 0, 180, 280);
    fill(255);
    text("Iterations: " + iterations, 10, 20);
    text("Number of fertilizers: " + fertilizers.length, 10, 40);
    text("  total mass of fertilizer: " + totalMassFertilizer, 10, 60);
    text("Number of raindrops: " + rainDrops.length, 10, 80);
    text("  total mass of water: " + totalMassWater, 10, 100);
    text("Number of plants: " + plants.length, 10, 120);
    text("  total mass of plants: " + totalMassPlants, 10, 140);
    text("Number of seeds: " + seeds.length, 10, 160);
    text("  total mass of seeds: " + totalMassSeeds, 10, 180);
    text("Number of sheeps: " + sheeps.length, 10, 200);
    text("  total mass of sheeps: " + totalMassSheeps, 10, 220);
    text("Number of wolves: " + wolves.length, 10, 240);
    text("  total mass of wolves: " + totalMassWolves, 10, 260);
}
class Fertilizer {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color(100, 0, 0);
        this.growing = true;
        this.updateAndDisplay = this.updateAndDisplay.bind(this);
    }

    grow() {
        if (this.growing) {
            for (let i = fertilizers.length - 1; i >= 0; i--) {
                const otherFertilizer = fertilizers[i];
                if (otherFertilizer !== this) {
                    const distance = dist(
                        this.x,
                        this.y,
                        otherFertilizer.x,
                        otherFertilizer.y
                    );
                    const combinedSize = this.size + otherFertilizer.size;
                    if (distance <= combinedSize / 2) {
                        this.size = combinedSize;
                        otherFertilizer.size = 0;
                        otherFertilizer.die();
                        otherFertilizer.growing = false;
                    }
                }
            }
        }
    }

    die() {
        if (this.size <= 0) {
            const index = fertilizers.indexOf(this);
            if (index !== -1) {
                fertilizers.splice(index, 1);
            }
        }
    }

    render() {
        noStroke();
        fill(this.color);
        ellipse(this.x, this.y, this.size > 100 ? 100 : this.size);
    }

    updateAndDisplay() {
        this.grow();
        this.die();
        this.render();
    }
}
class RainDrop {
    constructor(x, y, initialSize) {
        this.x = x;
        this.y = y;
        this.size = initialSize;
        this.color = color(0, 0, 255);
        this.growing = true;
        this.updateAndDisplay = this.updateAndDisplay.bind(this);
    }
    grow() {
        if (this.growing) {
            for (let otherRainDrop of rainDrops) {
                if (otherRainDrop !== this) {
                    const distance = dist(
                        this.x,
                        this.y,
                        otherRainDrop.x,
                        otherRainDrop.y
                    );
                    const combinedSize = this.size + otherRainDrop.size;

                    if (distance <= combinedSize / 2) {
                        this.size = combinedSize;
                        otherRainDrop.size = 0;
                        otherRainDrop.growing = false;
                    }
                }
            }
        }
    }
    die() {
        if (this.size <= 0) {
            const index = rainDrops.indexOf(this);
            if (index !== -1) {
                rainDrops.splice(index, 1);
            }
        }
    }

    render() {
        noStroke();
        fill(this.color);
        ellipse(this.x, this.y, this.size > 100 ? 100 : this.size);
    }

    updateAndDisplay() {
        this.grow();
        this.die();
        this.render();
    }
}
class Plant {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 20;
        this.color = color(0, 255, 0);
        this.water = 10;
        this.updateAndDisplay = this.updateAndDisplay.bind(this);
    }

    reproduce() {
        const maxDistance = 50;
        let nearestWaterDist = Infinity;
        let nearestFertilizerDist = Infinity;
        for (let drop of rainDrops) {
            const d = dist(this.x, this.y, drop.x, drop.y);
            if (d < nearestWaterDist) {
                nearestWaterDist = d;
            }
        }
        for (let fertilizer of fertilizers) {
            const d = dist(this.x, this.y, fertilizer.x, fertilizer.y);
            if (d < nearestFertilizerDist) {
                nearestFertilizerDist = d;
            }
        }
        const waterInfluence = map(nearestWaterDist, 0, maxDistance, 1, 0);
        const fertilizerInfluence = map(
            nearestFertilizerDist,
            0,
            maxDistance,
            1,
            0
        );
        const totalInfluence = (waterInfluence + fertilizerInfluence) / 2;
        let seedProbability = totalInfluence;
        if (random(1) < seedProbability) {
            this.size -= 1;
            const seedX = this.x + random(-20, 20);
            const seedY = this.y + random(-20, 20);
            seeds.push(new Seed(seedX, seedY));
        }
    }

    drink() {
        for (let raindrop of rainDrops) {
            const d = dist(this.x, this.y, raindrop.x, raindrop.y);
            if (d < this.size) {
                this.water += raindrop.size;
                raindrop.size = 0;
                raindrop.die();
            }
        }
    }

    feed() {
        for (let fertilizer of fertilizers) {
            const d = dist(this.x, this.y, fertilizer.x, fertilizer.y);
            if (d < this.size) {
                const index = fertilizers.indexOf(fertilizer);
                if (index !== -1 && fertilizer.size >= 1) {
                    fertilizer.size -= 100;
                    this.size += 100;
                }
            }
        }
        if (this.size > 0) {
            this.size -= 1;
        }
    }
    die() {
        if (this.water <= 0 || this.size <= 0) {
            fertilizers.push(new Fertilizer(this.x, this.y, this.size));
            const plantIndex = plants.indexOf(this);
            if (plantIndex !== -1) {
                plants.splice(plantIndex, 1);
            }
        }
    }

    render() {
        if (this.water > 0) {
            noStroke();
            fill(this.color);
            ellipse(this.x, this.y, this.size > 100 ? 100 : this.size);
        }
    }

    updateAndDisplay() {
        this.reproduce();
        this.drink();
        this.feed();
        this.die();
        this.render();
    }
}
class Seed {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 10;
        this.color = color(255, 255, 0);
        this.updateAndDisplay = this.updateAndDisplay.bind(this);
    }

    germinate() {
        const maxGerminationDistance = 100; // Adjust this distance as needed
        let nearestFertilizerDist = Infinity;
        let nearestWaterDist = Infinity;

        // Calculate distances to the nearest fertilizer and water sources
        for (let fertilizer of fertilizers) {
            const d = dist(this.x, this.y, fertilizer.x, fertilizer.y);
            if (d < nearestFertilizerDist) {
                nearestFertilizerDist = d;
            }
        }
        for (let drop of rainDrops) {
            const d = dist(this.x, this.y, drop.x, drop.y);
            if (d < nearestWaterDist) {
                nearestWaterDist = d;
            }
        }

        // Calculate factors based on distance
        const fertilizerFactor = map(
            nearestFertilizerDist,
            0,
            maxGerminationDistance,
            1,
            0
        );
        const waterFactor = map(nearestWaterDist, 0, maxGerminationDistance, 1, 0);

        // Calculate germination probability based on factors
        const germinationProbability = (fertilizerFactor + waterFactor) / 2;

        // Introduce randomness
        if (random(1) < germinationProbability) {
            // Create a new plant
            plants.push(new Plant(this.x, this.y));
            this.die(); // Remove the seed
        } else {
            // If the seed doesn't germinate, it can become fertilizer
            fertilizers.push(new Fertilizer(this.x, this.y, this.size));
            this.die(); // Remove the seed
        }
    }

    die() {
        const seedIndex = seeds.indexOf(this);
        if (seedIndex !== -1) {
            seeds.splice(seedIndex, 1);
        }
    }

    render() {
        noStroke();
        fill(this.color);
        ellipse(this.x, this.y, this.size > 100 ? 100 : this.size);
    }

    updateAndDisplay() {
        this.germinate();
        this.render();
    }
}

class Sheep {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 10;
        this.color = color(255, 255, 255);
        this.speed = 1;
        this.water = 1000;
        this.updateAndDisplay = this.updateAndDisplay.bind(this);
        this.gender = random() > 0.5 ? "male" : "female";
    }

    distanceTo(x, y) {
        return dist(this.x, this.y, x, y);
    }

    moveTo(x, y) {
        const angle = atan2(y - this.y, x - this.x);
        const speed = 500 / this.size;
        const newX = this.x + speed * cos(angle);
        const newY = this.y + speed * sin(angle);
        if (newX > this.size && newX < width - this.size && newY > this.size && newY < height - this.size) {
            this.x = newX;
            this.y = newY;
        }
    }

    reproduce(nearestSheep) {
        if (
            this.size > 20 &&
            nearestSheep.size > 20 &&
            this.gender !== nearestSheep.gender
        ) {
            sheeps.push(
                new Sheep(this.x + random(-20, 20), this.y + random(-20, 20))
            );
        }
    }

    feed(nearestPlant) {
        nearestPlant.size -= 200;
        this.size += 200;
    }

    drink(raindrop) {
        this.water += raindrop.size;
        rainDrops.splice(rainDrops.indexOf(raindrop), 1);
    }

    move() {
        let nearestRaindropDist = Infinity;
        let nearestPlantDist = Infinity;
        let nearestSheepDist = Infinity;
        let nearestWolfDist = Infinity;
        let nearestPlant = null;
        let nearestRaindrop = null;
        let nearestSheep = null;
        let nearestWolf = null;



        for (let wolf of wolves) {
            if (wolf !== this) {
                const d = this.distanceTo(wolf.x, wolf.y);
                if (d < nearestWolfDist) {
                    nearestWolfDist = d;
                    nearestWolf = wolf;
                }
            }
        }
        if (nearestWolfDist < 500) {
            const angleToWolf = atan2(this.y - nearestWolf.y, this.x - nearestWolf.x);
            const speed = 500 / this.size;
            this.x += speed * cos(angleToWolf);
            this.y += speed * sin(angleToWolf);
        } else {

            for (let raindrop of rainDrops) {
                const d = this.distanceTo(raindrop.x, raindrop.y);
                if (d < nearestRaindropDist) {
                    nearestRaindropDist = d;
                    nearestRaindrop = raindrop;
                }
            }

            for (let plant of plants) {
                const d = this.distanceTo(plant.x, plant.y);
                if (d < nearestPlantDist) {
                    nearestPlantDist = d;
                    nearestPlant = plant;
                }
            }

            for (let otherSheep of sheeps) {
                if (otherSheep !== this && otherSheep.gender !== this.gender) {
                    const d = this.distanceTo(otherSheep.x, otherSheep.y);
                    if (d < nearestSheepDist) {
                        nearestSheepDist = d;
                        nearestSheep = otherSheep;
                    }
                }
            }
            const minDist = min(
                nearestRaindropDist,
                nearestPlantDist,
                nearestSheepDist
            );

            switch (minDist) {
                case nearestRaindropDist:
                    this.moveTo(nearestRaindrop.x, nearestRaindrop.y);
                    this.size -= 1;
                    if (minDist <= this.size / 2 + nearestRaindrop.size / 2) {
                        this.drink(nearestRaindrop);
                    }
                    break;
                case nearestPlantDist:
                    this.moveTo(nearestPlant.x, nearestPlant.y);
                    this.size -= 1;
                    if (minDist <= this.size / 2 + nearestPlant.size / 2) {
                        this.feed(nearestPlant);
                    }
                    break;
                case nearestSheepDist:
                    this.moveTo(nearestSheep.x, nearestSheep.y);
                    this.size -= 1;
                    if (minDist <= this.size / 2 + nearestSheep.size / 2) {
                        this.reproduce(nearestSheep);
                    }
                    break;
                default:
                    break;
            }
        }
        seeds.push(new Seed(this.x, this.y));
    }

    die() {
        if (this.water <= 0 || this.size <= 0) {
            sheeps.splice(sheeps.indexOf(this), 1);
        }
    }

    render() {
        noStroke();
        fill(this.color);
        ellipse(this.x, this.y, this.size > 100 ? 100 : this.size);
    }

    updateAndDisplay() {
        this.move();
        this.die();
        this.render();
    }
}

class Wolf {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 10;
        this.color = color(255, 0, 0);
        this.speed = 1;
        this.water = 100;
        this.updateAndDisplay = this.updateAndDisplay.bind(this);
        this.gender = Math.random() < 0.5 ? "male" : "female";
    }

    distanceTo(x, y) {
        return dist(this.x, this.y, x, y);
    }

    moveTo(x, y) {
        const angle = atan2(y - this.y, x - this.x);
        const speed = 500 / this.size;
        const newX = this.x + speed * cos(angle);
        const newY = this.y + speed * sin(angle);
        const halfSize = this.size / 2;
        if (newX > halfSize && newX < width - halfSize && newY > halfSize && newY < height - halfSize) {
            this.x = newX;
            this.y = newY;
        }
    }
    reproduce(nearestWolf) {
        if (
            this.size > 50 &&
            nearestWolf.size > 50 &&
            this.gender !== nearestWolf.gender
        ) {
            wolves.push(new Wolf(this.x + random(-20, 20), this.y + random(-20, 20)));
        }
        if (
            this.gender === "male" &&
            nearestWolf.gender === "male" &&
            this.size > nearestWolf.size
        ) {
            wolves.splice(wolves.indexOf(nearestWolf), 1);
            fertilizers.push(
                new Fertilizer(nearestWolf.x, nearestWolf.y, nearestWolf.size)
            );
        }
    }

    drink(raindrop) {
        this.water += raindrop.size;
        rainDrops.splice(rainDrops.indexOf(raindrop), 1);
    }

    feed(nearestSheep) {
        nearestSheep.size -= 100;
        this.size += 100;
    }

    move() {
        let nearestRaindropDist = Infinity;
        let nearestSheepDist = Infinity;
        let nearestWolfDist = Infinity;
        let nearestRaindrop = null;
        let nearestSheep = null;
        let nearestWolf = null;

        for (let sheep of sheeps) {
            const d = this.distanceTo(sheep.x, sheep.y);
            if (d < nearestSheepDist) {
                nearestSheepDist = d;
                nearestSheep = sheep;
            }
        }

        if (nearestSheepDist < this.size * 1000) {
            this.moveTo(nearestSheep.x, nearestSheep.y);
            if (nearestSheep.size <= this.size) {
                this.feed(nearestSheep);
            }
        } else {

            for (let raindrop of rainDrops) {
                const d = this.distanceTo(raindrop.x, raindrop.y);
                if (d < nearestRaindropDist) {
                    nearestRaindropDist = d;
                    nearestRaindrop = raindrop;
                }
            }

            for (let otherWolf of wolves) {
                if (otherWolf !== this) {
                    const d = this.distanceTo(otherWolf.x, otherWolf.y);
                    if (d < nearestWolfDist) {
                        nearestWolfDist = d;
                        nearestWolf = otherWolf;
                    }
                }
            }

            const minDist = min(nearestRaindropDist, nearestWolfDist);

            switch (minDist) {
                case nearestRaindropDist:
                    this.moveTo(nearestRaindrop.x, nearestRaindrop.y);
                    if (minDist <= this.size / 2 + nearestRaindrop.size / 2) {
                        this.drink(nearestRaindrop);
                    }
                    break;
                case nearestWolfDist:
                    this.moveTo(nearestWolf.x, nearestWolf.y);
                    if (minDist <= this.size / 2 + nearestWolf.size / 2) {
                        this.reproduce(nearestWolf);
                    }
                    break;
                default:
                    break;
            }
        }
    }

    die() {
        if (this.water <= 0 || this.size <= 0) {
            wolves.splice(wolves.indexOf(this), 1);
        }
    }

    render() {
        noStroke();
        fill(this.color);
        ellipse(this.x, this.y, this.size > 100 ? 100 : this.size);
    }

    updateAndDisplay() {
        this.move();
        this.die();
        this.render();
    }
}
