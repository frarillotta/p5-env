// @ts-check
/// <reference path="../node_modules/@types/p5/global.d.ts" />

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
};

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(1050);
  translate(0, -150, -3300)
  rotateY(-.75)
  rotateX(-.1)
  
  rotateZ(.1)

  for (let i = 0; i < 40; i++) {
    push()
    for (let j = 0; j < 40; j++) {

      push();
      translate(i * 75, 0, j * 75);
      box(70, Math.sin(frameCount * 0.05 + j*0.5 + i*0.5) * 60 + 90, 70);
      pop()
      
    }
    pop()

  }

}