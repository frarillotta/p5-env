let circles = [];
let circle2;
function setup() {
  createCanvas(500, 500);
  for (let radius = 50; radius < 500; radius += 50) {
    circles.push(new Circle(radius))
  }
  strokeWeight(5);
  
}

function draw() {
  translate(width/2, height/2);
  background(255);
  
  circles.forEach((circle) => circle.show())
}

class Circle {
  
  constructor(radius) {
    
    this.radius = radius;
    this.step = PI/(radius / 5);
    this.coords = this.calculateCoords();

  }
  
  calculateCoords() {
    
      const coords = []
    
      for (let angle = 0; angle < PI * 2; angle += this.step) {

        const x = this.radius * sin(angle);

        const y = this.radius * cos(angle);
        
        coords.push({x: x, y: y})
        
      }
    
      return coords;
  }
  
  show() {
    this.coords.forEach(({x, y})=>{
      point(x, y + noise(y)*frameCount/4);
    })
      
  }
  
}