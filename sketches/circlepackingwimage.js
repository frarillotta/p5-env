// @ts-check
/// <reference path="./node_modules/@types/p5/global.d.ts" />

class Circle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.r = 2;
      this.growing = true;
    }
    
    show() {
        ellipse(this.x, this.y, this.r*2, this.r*2);
    }
    
    grow() {
      if (this.growing) {
        this.r = this.r+1;
      }
    }
    
    edges() {
      return (this.x + this.r > width || this.x - this.r < 0 || this.y + this.r > height || this.y - this.r < 0)
    }
    
  }
  
  function newCircle() {
  
    const r = parseInt(random(0, spots.length));
    const spot = spots[r];
    let x = spot.x;
    let y = spot.y;
    let valid = true;
    for (let circle of circles) {
      let distance = dist(x, y, circle.x, circle.y);
      if (distance < circle.r) {
        valid = false;
        break;
      }
    }
    
    if (valid) {
      return new Circle(x, y);
    } else {
      return null;
    }
  }
  
  let circles = [];
  let spots = [];
  let img;
  
  function preload() {
    img = loadImage('assets/triangle.png');
  }
  
  
  function imageIndex(img, x, y) {
    return 4 * (x + y * img.width);
  }
  function getColorAtindex(img, x, y) {
    let idx = imageIndex(img, x, y);
    let pix = img.pixels;
    let red = pix[idx];
    let green = pix[idx + 1];
    let blue = pix[idx + 2];
    let alpha = pix[idx + 3];
    return color(red, green, blue, alpha);
  }
  
  function setup() {
    createCanvas(600, 350);
    img.loadPixels();
    for (let x = 0; x < img.width; x++) {
      for (let y = 0; y < img.height; y++) {
  
        const color = getColorAtindex(img, x, y)
        const b = brightness(color);
        if (b < 50) {
          spots.push(createVector(x, y));
        }
  
      }
    }
  };
  
  
  
  function draw() {
    background(0);
    stroke(255);
    noFill();
    const total = 10;
    let count = 0;
  
    let attempts = 0;
    while (count < total) {
    const c = newCircle();
      if (c !== null) {
        circles.push(c);
      }
      count++;
      attempts++;
      if (attempts > 1000) {
        noLoop();
        break;
      }
    }
    circles.forEach((circle)=>{  
      if (circle.growing) {
        if (circle.edges()) {
          circle.growing = false;
        } else {
          for (let cir of circles) {
            if (circle != cir) {
              const d = dist(circle.x, circle.y, cir.x, cir.y);
              if (d - 2 < circle.r + cir.r) {
                circle.growing = false;
                break;
              }
            }
          }
        }
      }
  
      circle.show();
      circle.grow();
  
    })
  }