// @ts-check
/// <reference path="./node_modules/@types/p5/global.d.ts" />

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
  };
  
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
  
  function draw() {
  
    clear();
    let t = millis();
  
    let o = 20;
    let c = 180;
    stroke(255);
    noFill();
    rectMode(CENTER);
    translate(width / 2, height / 2);
    rotate( PI / 4 );
    for (var i = c; i > 0; i--) {
  
        rotate((c - i) * t * 0.0000001);
        rect(0, 0, o * i, o * i);
  
    }
  
  }