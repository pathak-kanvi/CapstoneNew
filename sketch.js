var PLAY = 1;
var END = 0;
var gameState = PLAY;

var girl, girl_running, girl_collided;
var ground, invisibleGround, groundImage;
var backgroundImg;

var obstaclesGroup, obstacle2, obstacle1,obstacle3;
var score=0;
var diamonds=0;


var gameOver, restart;


function preload(){
  girl_running = loadAnimation("girl1.PNG","girl2.PNG","girl3.PNG", "girl4.PNG", "girl5.PNG", "girl6.PNG");
  girl_collided = loadAnimation("girl2.PNG");

  backgroundImg = loadImage("candyground.png");
 
  obstacle1 = loadImage("obstacle1.PNG");
  obstacle2 = loadImage("obstacle2.PNG");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");

  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("reset.PNG");
 
}

function setup() {
  createCanvas(600, 200);
  background1 = createSprite(200,180,400,20);
  background1.addImage("background",backgroundImg);
  background1.x = 300
 
background1.scale=2.5
  
  invisibleGround= createSprite(300,200,600,30);
  invisibleGround.shapeColor="#FCDCD7";

  girl = createSprite(50,160,20,50,);
  girl.addAnimation("running",girl_running)
  girl.scale = 0.5;

girl.debug= true;
girl.setCollider("rectangle",0,0,50,50)
  gameOver = createSprite(300,85);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
 
  obstaclesGroup = new Group();
  

  obstaclesGroup.debug = true;
  
  score = 0;
  diamonds = 0;
}

function draw() {
  background(0);
  drawSprites();
  textSize(15);
  textFont("copperplate gothic");
  fill("white");
  
  text("Score: "+ score, 500,25);
//text("life: "+ life , 500,60);
 
  if (gameState===PLAY){
   score = score + Math.round(getFrameRate()/60);
   background1.velocityX = -4; 
    spawnObstacles()
    if(keyDown("space") && girl.y >= 100) {
      girl.velocityY = -12;
      
    }
  
    girl.velocityY = girl.velocityY + 0.8
  
    if(background1.x <100){
      background1.x = background1.width /2;
     }
  
     girl.collide(invisibleGround);
    
    
   
  
   if(obstaclesGroup.isTouching(girl)){
        gameState = END;
      
    } 
  }


  
  else if (gameState === END ) {
    
    gameOver.visible = true;
    gameOver.scale = 0.25
    restart.visible = true;
    restart.scale = 0.25;
    girl.addAnimation("collided",girl_collided);
    
    //set velcity of each game object to 0
    background1.velocityX = 0;
    girl.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    
    //change the trex animation
    girl.changeAnimation("collided",girl_collided);
    girl.scale =0.5;
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
   
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
}



function spawnObstacles() {
  if(frameCount % 80 === 0) {
    var obstacle = createSprite(600,165,10,40);    
    obstacle.scale = 0.19;
    obstacle.debug=true
    //generate random obstacles
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: obstacle.addImage(obstacle2);
              break;
      case 2: obstacle.addImage(obstacle1);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              obstacle.scale=1.2;
              obstacle.setCollider("circle",0,50,40);
              obstacle.y=120
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
    }
        
    obstacle.velocityX = -4;
    
    //assign scale and lifetime to the obstacle           
    
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  
  girl.changeAnimation("running",girl_running);
  girl.scale =0.5;
  
  score = 0;
  diamonds = 0;
  
}