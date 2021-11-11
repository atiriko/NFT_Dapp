
var canvas;

class Star {
  constructor(x, y, brightness, isRed) {
    this.x = x;
    this.y = y;
    this.isRed = isRed
    this.brightness = brightness;
    noStroke()

    ellipse(this.x,this.y,2,2);

    //draw();
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

function setup(){
  if (windowWidth<800){
    canvas = createCanvas(windowWidth,10100)

  }else{
    canvas = createCanvas(windowWidth,4900)

  }
  canvas.position(0,0)
  canvas.style('z-index', '-2')
 
  // background(255);
  for(let i = 0; i < 5000; i++){

    // map(sin(frameCount)-1,1,0,255)
    // console.log(sin(frameCount))
    xs.push(random(0,windowWidth))
    ys.push(random(0,canvas.height))

  }
  for(let i = 0; i < 5000; i++){
    // map(sin(frameCount)-1,1,0,255)


    let star
    star = new Star(xs[i],ys[i],map(sin(i+frameCount*0.02),-1,1,50,255), i%2 == 0);
   star.draw();

    // ellipse(xs[i],ys[i],2,2);
  }

}



function windowResized(){
  
  if (windowWidth<800){
    resizeCanvas(windowWidth,10100)

  }else{
    resizeCanvas(windowWidth,4900)

  }
  xs=[]
  ys=[]
  for(let i = 0; i < 5000; i++){

    // map(sin(frameCount)-1,1,0,255)
    // console.log(sin(frameCount))
    xs.push(random(0,windowWidth))
    ys.push(random(0,canvas.height))

  }

  for(let i = 0; i < 5000; i++){
    // map(sin(frameCount)-1,1,0,255)


    let star
    star = new Star(xs[i],ys[i],map(sin(i+frameCount*0.02),-1,1,50,255), i%2 == 0);
   star.draw();

    // ellipse(xs[i],ys[i],2,2);
  }
}

function draw(){
  // fill(map(sin(frameCount*0.02),-1,1,50,255)); 
//  background(0);
  

  

}

