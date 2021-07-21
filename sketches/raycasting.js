// @ts-check
/// <reference path="../node_modules/@types/p5/global.d.ts" />

class Boundary {
    constructor(x1, y1, x2, y2) {
      this.a = createVector(x1, y1);
      this.b = createVector(x2, y2);  
    }
    
    show() {
      stroke(255);
      line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
  }
  
  class Ray {
    constructor(pos, angle) {
      this.pos = pos;
      this.dir = p5.Vector.fromAngle(angle);
    }
    
    show() {
      stroke(255);
      push();
      translate(this.pos.x, this.pos.y);
      line(0, 0, this.dir.x * 10, this.dir.y * 10);
      pop();
    }
    
    lookAt(x, y) {
      this.dir.x = x - this.pos.x;
      this.dir.y = y - this.pos.y;
      this.dir.normalize();
    }
    
    cast(wall) {
      const x1 = wall.a.x;
      const y1 = wall.a.y;
      const x2 = wall.b.x;
      const y2 = wall.b.y;
      
      const x3 = this.pos.x;
      const y3 = this.pos.y;
      const x4 = this.pos.x + this.dir.x;
      const y4 = this.pos.y + this.dir.y;
      
      const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
      if (den === 0) {
        return;
      }
      
      const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
      const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
      if (t > 0 && t < 1 && u > 0) {
        const pt = createVector();
        pt.x = x1 + t * (x2 - x1);
        pt.y = y1 + t * (y2 - y1);
        return pt;
      } else {
        return;
      }
    }
    
  }
  
  class Particle {
    constructor() {
      this.pos = createVector(width/2, height/2);
      this.rays = [];
      for (let i = 0; i < 360; i += 1) {
        this.rays.push(new Ray(this.pos, radians(i)));
      }
    }
    
    show() {
      fill(255);
      ellipse(this.pos.x, this.pos.y, 16);
      for (let ray of this.rays) {
        ray.show();
      }
    }
    
    update(x, y) {
      this.pos.set(x, y);
    }
    
    look(walls) {
      for (let ray of this.rays) {
        let closest = null;
        let record = Infinity;
        for (let wall of walls) {
          const pt = ray.cast(wall);
          if (pt) {
            const d = p5.Vector.dist(this.pos, pt);
            if (d < record) {
              record = d;
              closest = pt;
            }    
          }
        }
        if (closest) {
          stroke(255, 90);
          line(this.pos.x, this.pos.y, closest.x, closest.y);
        }
      }
    }
    
  }
  
  let walls = [];
  let ray;
  let particle;
  let xoff = 0;
  let yoff = 10000;
  
  function setup() {
    createCanvas(700, 500);
    for (let i = 0; i < 5; i++) {
      let x1 = random(width);
      let x2 = random(width);
      let y1 = random(height);
      let y2 = random(height);
      walls[i] = new Boundary(x1, y1, x2, y2);
    }
    particle = new Particle();
  }
  
  function draw() {
    background(0);
    for (let wall of walls) {
      wall.show();
    }
    walls.push(new Boundary(0, 0, width, 0));
    walls.push(new Boundary(width, 0, width, height));
    walls.push(new Boundary(width, height, 0, height));
    walls.push(new Boundary(0, height, 0, 0));
    particle.show();
    particle.look(walls);
    particle.update(noise(xoff)*width, noise(yoff)*height);
    
    xoff += 0.01;
    yoff += 0.01;
  
  }