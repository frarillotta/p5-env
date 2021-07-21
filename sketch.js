// @ts-check
/// <reference path="../node_modules/@types/p5/global.d.ts" />

class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 1;
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
  let x = random(width);
  let y = random(height);
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
function setup() {
  createCanvas(windowWidth, windowHeight);
};

function windowResized() {
resizeCanvas(windowWidth, windowHeight);
}


function draw() {
  background(255);
  stroke(0);
  noFill();
  const c = newCircle();
  if (c !== null) {
    circles.push(c);
  }
  circles.forEach((circle)=>{  
    if (circle.growing) {
      if (circle.edges()) {
        circle.growing = false;
      } else {
        for (let cir of circles) {
          if (circle != cir) {
            const d = dist(circle.x, circle.y, cir.x, cir.y);
            if (d - 2  < circle.r + cir.r + 2) {
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