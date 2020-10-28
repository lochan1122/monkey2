var player,banana,obstacle,back,back_image,obstacle_image,player_running,banana_image,invisGround,edges,obstacleGroup,score,bananaGroup;
var gameState=1;
var PLAY=1;
var END=0;
function preload(){
  back_image=loadImage("jungle.jpg");
  player_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  obstacle_image=loadImage("stone.png");                     banana_image=loadImage("banana.png") ;
}

function setup() {
  createCanvas(400, 400);
  back=createSprite(200,200,400,400);
  player=createSprite(30,350,20,20);
  invisGround=createSprite(200,380,400,5);
  invisGround.visible=false;
  obstacleGroup=createGroup();
  bananaGroup=createGroup();
  back.addImage(back_image);
  player.addAnimation("run",player_running);
  player.scale=0.1;
  back.velocityX=-4;
  back.x=back.width/2;
  score=0;
}

function draw() {
  background(220);
  player.velocityY=player.velocityY+0.5;
      if(keyDown("space")&&player.y>322)
    {
      player.velocityY=-10;
    }
  console.log(player.y);
       spawnObstacles();
       spawnBanana();
      if(back.x<0)
    {
      back.x=back.width/2;
    }
  if(bananaGroup.isTouching(player))
    {
      score=score+2;
      bananaGroup.destroyEach();
    }
  if(obstacleGroup.isTouching(player))
    {
      player.scale=0.1;
    }
  switch(score)
    {
      case 10:player.scale=0.12;
              break;
      case 20:player.scale=0.14;
              break;
      case 30:player.scale=0.16;
              break;
      case 40:player.scale=0.18;
              break;
      default:break;
    }
  
  player.collide(invisGround);
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,300,50);
}
function spawnObstacles()
{
  if(World.frameCount%100===0)
    {
      var obstacle=createSprite(400,360,20,20);
      obstacle.addImage(obstacle_image);
      obstacle.scale=0.1;
      obstacle.velocityX=-4;
      obstacle.lifetime=150;
      obstacle.depth=player.depth;
      obstacle.depth=obstacle.depth+1;
      obstacleGroup.add(obstacle);
    }
}

function spawnBanana()
{
  if(World.frameCount%100===0)
    {
      var banana=createSprite(400,random(200,250),20,20);
      banana.addImage(banana_image);
      banana.scale=0.05;
      banana.velocityX=-4;
      banana.lifetime=150;
      banana.depth=player.depth;
      banana.depth=banana.depth+1;
      bananaGroup.add(banana);
    }
}
