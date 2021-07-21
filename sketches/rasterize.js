// @ts-check
/// <reference path="./node_modules/@types/p5/global.d.ts" />
let david;
const FG = "#111111";
const BG = "#f1f1f1";
function preload() {
  david = loadImage('assets/david.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(BG);

  david.resize(500, 700)
  image(david, 0, 0);
};

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(BG);
  fill(FG);
  noStroke();
  const ratio = float(String(height))/float(String(width));
  const tilesX = map(3000, 0, width, 10, 100);
  const tilesY = ratio * tilesX;
  const tileSize = width / tilesX;
  for (let y = 0; y < david.height; y += tileSize) {
    for (let x = 0; x < david.width; x += tileSize) {
      const c = david.get(x, y);
      const b = map(brightness(c), 0, 255, 1, 0);
      push()
      translate(x, y);
      // rect(0, 0, b * tileSize, b * tileSize);
      circle(0, 0, b * tileSize);
      pop();

    }
  }
}