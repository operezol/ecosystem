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
    console.log(rainDrop);
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

  updateAndDisplay() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size);
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

