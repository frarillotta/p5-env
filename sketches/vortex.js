// @ts-check
/// <reference path="../node_modules/@types/p5/global.d.ts" />

function setup() {
    createCanvas(600, 600);
  };
  
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
  var t = 0,
    i = 0,
    p = 0,
    a = 0;
  function draw(){
    t+=.01;
    
    clear();
    translate(300,300);
    for(let i=0;i<99;i++){
      for(a=0;a<TAU;a+=TAU/99) {
        fill((p=(i+10*t)/99)*255+255*sin(9*a)+128);
        push();
        rotate(PI*p);
        circle(999*p*p*p*cos(a), 999*p*p*p*sin(a)+150,9*p);pop();
      }
    }
  }