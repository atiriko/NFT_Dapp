
var canvas;

class Star {
  constructor(x, y, brightness) {
    this.height = height;
    this.width = width;
    this.brightness = brightness;
    draw();
  }
  draw(){
    fill(255);
    noStroke()
    ellipse(x,y,20,20);

  }
}
// let star = new Star(2,2,2);

var xs = [];
var ys = [];
function setup(){
  canvas = createCanvas(windowWidth,5300)
  canvas.position(0,0)
  canvas.style('z-index', '-2')
  // background(255);
  for(let i = 0; i < 5000; i++){

    // map(sin(frameCount)-1,1,0,255)
    // console.log(sin(frameCount))
    xs.push(random(0,windowWidth))
    ys.push(random(0,canvas.height))

  }

  
}
function windowResized(){
  resizeCanvas(windowWidth,windowHeight)

}

function draw(){
  fill(map(sin(frameCount*0.02),-1,1,50,255)); 
   background(0);

  for(let i = 0; i < 5000; i++){
    // map(sin(frameCount)-1,1,0,255)
    // console.log(sin(frameCount))

    noStroke()
    ellipse(xs[i],ys[i],2,2);
  }
  
  
  // star.draw();

}

