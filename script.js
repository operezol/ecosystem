let rainDrops = [];
let fertilizers = [];
let plants = [];
let wolves = [];
let sheeps = [];
let seeds = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 10; i++) {
    rainDrops.push(new RainDrop(random(width), random(height)));
  }
  for (let i = 0; i < 10; i++) {
    fertilizers.push(new Fertilizer(random(width), random(height), random(50)));
  }
  for (let i = 0; i < 10; i++) {
    seeds.push(new Seed(random(width), random(height)));
  }
  for (let i = 0; i < 10; i++) {
    plants.push(new Plant(random(width), random(height)));
  }
  for (let i = 0; i < 10; i++) {
    wolves.push(new Wolf(random(width), random(height)));
  }
  for (let i = 0; i < 10; i++) {
    sheeps.push(new Sheep(random(width), random(height)));
  }
}

function draw() {
  background(220);

  for (let i = 0; i < 10; i++) {
    rainDrops.push(new RainDrop(random(width), random(height)));
  }

  rainDrops.forEach(rainDrop => {
    rainDrop.updateAndDisplay();
  });

  fertilizers.forEach(fertilizer => {
    fertilizer.updateAndDisplay();
  });

  seeds.forEach(seed => {
    seed.updateAndDisplay();
  });

  plants.forEach(plant => {
    plant.updateAndDisplay();
  });

  wolves.forEach(wolf => {
    wolf.updateAndDisplay();
  });

  sheeps.forEach(sheep => {
    sheep.updateAndDisplay();
  });
}

class Seed {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
    this.color = color(255, 255, 0);
    this.updateAndDisplay = this.updateAndDisplay.bind(this);
  }

  updateAndDisplay() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size);

    let nearestFertilizerDist = Infinity;
    let nearestWaterDist = Infinity;

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

    const maxGerminationDistance = 100;
    const fertilizerFactor = map(nearestFertilizerDist, 0, maxGerminationDistance, 1, 0);
    const waterFactor = map(nearestWaterDist, 0, maxGerminationDistance, 1, 0);

    const germinationProbability = (fertilizerFactor + waterFactor) / 2;

    if (random(1) < germinationProbability) {
      plants.push(new Plant(this.x, this.y));
      const seedIndex = seeds.indexOf(this);
      if (seedIndex !== -1) {
        seeds.splice(seedIndex, 1);
      }
    } else {
      fertilizers.push(new Fertilizer(this.x, this.y, this.size));
      const seedIndex = seeds.indexOf(this);
      if (seedIndex !== -1) {
        seeds.splice(seedIndex, 1);
      }
    }
  }
}

class Plant {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.color = color(0, 255, 0);
    this.updateAndDisplay = this.updateAndDisplay.bind(this);
  }

  spawnSeed(waterDrops, fertilizers) {
    const maxDistance = 50;
    let nearestWaterDist = Infinity;
    let nearestFertilizerDist = Infinity;
  
    for (let drop of waterDrops) {
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
  
    const fertilizerInfluence = map(nearestFertilizerDist, 0, maxDistance, 1, 0);
  
    const totalInfluence = (waterInfluence + fertilizerInfluence) / 2;
  
    let seedProbability = totalInfluence;
  
    if (random(1) < seedProbability) {
      const seedSize = random(5, 15);
      this.size -= seedSize;
      const seedX = this.x + random(-20, 20);
      const seedY = this.y + random(-20, 20);
      seeds.push(new Seed(seedX, seedY, seedSize));
    }
  }
  
  updateAndDisplay() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size);
    this.spawnSeed();
  }
}

class Fertilizer {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color(100, 0, 0);
    this.updateAndDisplay = this.updateAndDisplay.bind(this);
  }

  updateAndDisplay() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }
}

class RainDrop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
    this.color = color(0, 0, 255);
    this.updateAndDisplay = this.updateAndDisplay.bind(this);
  }

  updateAndDisplay() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }
}


class Sheep {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
    this.color = color(255, 255, 255);
    this.updateAndDisplay = this.updateAndDisplay.bind(this);
  }

  updateAndDisplay() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }
}


class Wolf {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
    this.color = color(255, 0, 0);
    this.updateAndDisplay = this.updateAndDisplay.bind(this);
  }

  updateAndDisplay() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }
}

