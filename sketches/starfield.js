// @ts-check
/// <reference path="./node_modules/@types/p5/global.d.ts" />
let stars = new Array(800);

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < stars.length; i++) {
    
    stars[i] = new Star();
    
  }
}


function draw() {
  background(255);
  translate (width /2, height/2);
  for (let i = 0; i < stars.length; i++) {
    
    stars[i].update();
    stars[i].show();
    
  }
  
}

class Star {
  
  constructor() {
    
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);
    
  }
  
  show() {
    fill(0);
    noStroke();
    const sx = map(this.x / this.z, 0, 1, 0, width);
    const sy = map (this.y / this.z, 0, 1, 0, height);
    const r = map(this.z, 0, width, 16, 0);
    ellipse(sx, sy, r, r);
  }
  
  update() {
    this.z = this.z - 10;
    if (this.z < 1) {
      this.z = width;
    }
  }
  
}