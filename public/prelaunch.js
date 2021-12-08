
var canvas;
class Star {
  constructor(x, y, brightness, isRed) {
    this.x = x;
    this.y = y;
    this.isRed = isRed;
    this.brightness = brightness;
    noStroke();
    ellipse(this.x,this.y,2,2);

  }
  draw(){
    if (this.isRed){
      fill(this.brightness, this.brightness-20, this.brightness-20);
    }else{
      fill(this.brightness-20, this.brightness-20, this.brightness);
    }

  }
}


var xs = [];
var ys = [];
let star = [];

function setup(){
  if (windowWidth<800){
    canvas = createCanvas(windowWidth,2400)

  }else{

    canvas = createCanvas(windowWidth,2400)

  }
  canvas.position(0,0)
  canvas.style('z-index', '-2')
 
  for(let i = 0; i < 5000; i++){
    star.push(new Star(random(0,windowWidth),random(0,canvas.height),map(sin(i+frameCount*0.02),-1,1,50,255), i%2 == 0));
    star[i].draw();

  }

}



function windowResized(){
  
  if (windowWidth<800){
    resizeCanvas(windowWidth,2400)
  }else{
    resizeCanvas(windowWidth,2400)
  }

  star = []

  for(let i = 0; i < 5000; i++){
    star.push( new Star(random(0,windowWidth),random(0,canvas.height),map(sin(i+frameCount*0.02),-1,1,50,255), i%2 == 0));
    star[i].draw();
  }

}


function draw(){
  if (windowWidth<800){
    if(window.scrollY > 3000 && window.scrollY < 6000){
      canvas.position(0,2900)
  
    }else if(window.scrollY > 6000){
      canvas.position(0,5900)
  
    }else{
      canvas.position(0,0)
  
    }

  }




}

