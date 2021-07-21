function setup() {
    createCanvas(500, 800);
  }
  let xoff = 1;
  let yoff = 1;
  
  function draw() {
  
      stroke(0);
      for (let i = 0; i < 3; i ++) {
          for (x = 0; x < 200; x++) {
              for (y = 0; y < 700; y++) {
                if (random(1)>0.9-0.05*i) {
                  strokeWeight(random(0.2 + y /500, 0.9 + y/100 - i*0.1));
                  point (xoff + x + random(-2, 2), yoff + y - random(-3, 3));
                }
              }
            
          }
        noLoop()
      }
      
  
  }