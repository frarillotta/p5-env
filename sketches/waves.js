// @ts-check
/// <reference path="../node_modules/@types/p5/global.d.ts" />

function setup() {
    createCanvas(600,600, WEBGL);
  };
  
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
  
  var t = 0,
    x = 0,
    y = 0,
    z = 0,
    d = 0;
  function draw(){
    t+=.01;
    clear();
    for(let x=20;x<=580;x+=7) {
      for(let z=0;z>-1600;z-=7) {
        push();
        translate(x,y=450-600*sin(TAU*(t+noise(x*.002,z*.002))+z/5)*z/1600,z);
        stroke(255*map(y,-150,300,0,1));
        fill(0);
        box(7,99,7);
        pop();
      }
    }
  }
  