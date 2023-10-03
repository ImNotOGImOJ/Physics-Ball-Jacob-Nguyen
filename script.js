///set up
const shape = document.getElementById("shape");
const ctx = shape.getContext('2d');

//vars
var currentX;
var currentY;
//friction when touching surfaces
var fricX = 0.8;
var fricY = 0.9;
var fricWalls = 1;

//blueprint for circles, traits inhereted from blueprint function go into here 
function Circle(x, y, radius, color, mass, velX, velY, accelX, accelY){
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.mass = mass;
  this.velX = velX;
  this.velY = velY;
  this.accelX = accelX;
  this.accelY = accelY;
  //redraws when called
  this.update = function(){
    this.drawC();
  }

  this.drawC = function(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, 0, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }
  this.box = function(){
    //outside of the box
  if (this.x + this.radius > 310 || this.x - this.radius < 10){
    this.velX = -this.velX * fricWalls;
  } else {
    this.velX += this.accelX;
  }
   if (this.y + this.radius > 300  || this.y - this.radius < 0){
     this.velY = -this.velY * fricY;
     this.velX = this.velX * fricX;
  } else {
    this.velY += this.accelY;
  }
 }
}
//initialzes values for new circle objects
let circle1;
let circle2;
function bluePrint(){
  //
  circle1 = new Circle(150, 100, 15, "blue", 0, 3.23, 1.4251, 0, .2);
  circle2 = new Circle(40, 100, 20, "red", 2, 3, 2, 0, 0);
}

function elastic(){
  if (getDistance(circle1.x, circle1.y, circle2.x, circle2.y) <  circle1.radius + circle2.radius || getDistance(circle1.x, circle1.y, circle2.x, circle2.y) > circle1.radius + circle2.radius){

    var normalVectorX = circle1.x - circle2.x;
    var normalVectorY = circle1.y - circle2.y;
    var unitVectorX = normalVectorX / Math.abs(normalVectorX);
    var unitVectorY = normalVectorY / Math.abs(normalVectorY);

    var kineticMomentumX1 = circle1.velX * (circle1.mass - circle2.mass) + 2 * circle2.mass * circle2.velX / (circle1.mass + circle2.mass);
    var kineticMomentumX2 = circle2.velX * (circle2.mass - circle1.mass) + 2 * circle1.mass * circle1.velX / (circle1.mass + circle2.mass);
    circle1.velX = kineticMomentumX1;
    circle2.velX = kineticMomentumX2;
  //////////////// 
   /* var finalMomentumY = circle2.velY * (circle2.mass - circle1.mass) + 2 * circle1.mass * circle1.velX / (circle1.mass + circle2.mass);
    circle1.velY = finalMomentumY;
    circle2.velY = (circle1.velY - circle2.velY) - finalMomentumY;*/
    //console.log("hit");
  }
}
//draws square 
function drawSq(){
    ctx.beginPath();
    ctx.rect(10, 0, 300, 300);
    ctx.stroke();
    ctx.closePath();
}

//gets distance between 2 points with pythag therom
function getDistance(x1, y1, x2, y2){
  let xDist = x2 - x1;
  let yDist = y2 - y1;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

//redraws everything every frame
function animate(){
  window.requestAnimationFrame(animate);
  ctx.clearRect(0,0, shape.width, shape.height);
  drawSq();

  circle1.x = circle1.x + circle1.velX;
  circle1.y = circle1.y + circle1.velY;

  circle2.x = circle2.x + circle2.velX;
  circle2.y = circle2.y + circle2.velY;

 // elastic();

  circle1.box();
  circle1.update();

 // circle2.box();
  //circle2.update();
}
bluePrint();
animate();
