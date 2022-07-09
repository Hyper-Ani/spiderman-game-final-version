
var PLAY = 1
var END = 0
var gameState = PLAY;
var s1, s2;
var s1i, s2i;
var cave, forest;
var ci, fi;
var goblin, gi;
var topg, bottomg;
var goblingroup;
var go;
var gameOver;
var ri, restart;


function preload(){
  fi= loadImage("Images/forest.jpg");
  ci= loadImage("Images/cave.jpg");
  gi= loadImage("Images/goblin.png");
  s2i= loadImage("Images/s2.png");
  s1i= loadImage("Images/S1.jpg");
  go= loadImage("Images/gameover.png");
  ri= loadImage("Images/restart.jpg");

}

function setup() {
  createCanvas(800,400);
  

  forest= createSprite(400, 200, 800, 400);
  forest.addImage(fi);
  forest.scale= 2;

  gameOver = createSprite(450,175);
  gameOver.addImage(go);

  restart = createSprite(450,260);
  restart.addImage(ri);
  restart.scale = 0.2;

  s2= createSprite(100, 250, 50, 120);
  s2.addImage("jumping", s2i);

  s2.debug=false;
    s2.setCollider("rectangle", 0, 0, 30, s2.height);

  topg= createSprite(400, 400, 800, 20);

  goblingroup = createGroup();
  
  
}

function draw() {
  background(255,255,255);  
if(gameState === PLAY){
  
  gameOver.visible=false;
  restart.visible= false;
  if(keyDown("space")) {
    s2.velocityY= -5;
    s2.changeImage("jumping", s1i);
  }
  s2.velocityY = s2.velocityY + 0.6;

  s2.collide(topg);
  if(goblingroup.isTouching(s2)){
    gameState = END
  }
}
  
  else if(gameState === END){
    gameOver.visible=true;
    restart.visible=true;
    goblingroup.setVelocityXEach(0);
    goblingroup.setLifetimeEach(-1);
    s2.velocityX=0
    s2.velocityY=0

    //to use the restart button
    if(mousePressedOver(restart)) {
      reset();
    }

  }
  
  
  drawSprites();
  spawnGoblins();

}



function spawnGoblins() 
{
      if(World.frameCount % 60 === 0) {
        goblin = createSprite(800,50,40,50);
    
    //obstacleTop.addImage(obsTop1);
    goblin.debug=false;
    goblin.setCollider("rectangle", 0, 0, 40, goblin.height);
    
    goblin.scale = 0.4;
    goblin.velocityX = -4;

    //random y positions for top obstacles
    goblin.y = Math.round(random(10,300));

    //generate random top obstacles
    var rand = Math.round(random(1,2));
    goblin.addImage(gi);
      

     //assign lifetime to the variable
   goblin.lifetime = 200;
    
   goblingroup.add(goblin);
   
      }
}

//to reset all properties once restart button is pressed
function reset(){
  gameState=PLAY;
  goblingroup.destroyEach(0);
}
  
  
