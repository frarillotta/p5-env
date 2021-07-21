// @ts-check
/// <reference path="./node_modules/@types/p5/global.d.ts" />

let curves = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  curves.push(  {
    x1: 10,
    y1: 0,
    x2: 10,
    y2: 200,
    x3: 10,
    y3: 400,
    x4: 10,
    y4: windowHeight
  })
}

//curve = {x1: number; y1: number; x2: number; y2: number; x3: number; y3: number; x4: number; y4: number; }

function draw() {
  background(0);
  stroke(255);
  for (let i = 1; i < width/10; i++) {
    let previousCurve = curves[i - 1];
    const xoffset = i*10;
    const currentCurve = {
      x1: xoffset,
      y1: 0,
      x2: xoffset,
      y2: 200,
      x3: xoffset + constrain(noise(xoffset)*i*2, i, i +10),
      y3: 400,
      x4: xoffset + constrain(noise(xoffset)*i*3, i, i +10),
      y4: windowHeight
    };
    curves.push(currentCurve);
    push();
    strokeWeight(1);
    beginShape();
    curveVertex(currentCurve.x1, currentCurve.y1);
    curveVertex(currentCurve.x1, currentCurve.y1);
    curveVertex(currentCurve.x2, currentCurve.y2);
    curveVertex(currentCurve.x3, currentCurve.y3);
    curveVertex(currentCurve.x4, currentCurve.y4);
    curveVertex(currentCurve.x4, currentCurve.y4);
    endShape();
    
  }
  noFill();
   
}