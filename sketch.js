
var ball,database,position;

function preload(){
  bgimg=loadImage("Hot Air Ballon-01.png");
  balloonimg=loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png");
}

function setup(){
  database=firebase.database();
  createCanvas(1100,600);
  balloon= createSprite(300, 100, 50, 50);
  balloon.addAnimation("flyingballoon",balloonimg);
  var balloonpos=database.ref('balloon/position');
  balloonpos.on("value",readPosition,showerror);
}



function draw(){
    background(bgimg);
    textSize(20);
    fill("black");
    text("'Use arrow-keys to move the balloon'",750,50);
    if(position!==undefined){
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();

}
if(keyDown(UP_ARROW)){
    balloon.scale=balloon.scale-0.01
}
if(keyDown(DOWN_ARROW)){
    balloon.scale=balloon.scale+0.01
}

console.log( balloon.scale);
}
function readPosition(data){
    position=data.val();
    balloon.x=position.x;
    balloon.y=position.y;
}

function writePosition(x,y){
    database.ref('balloon/position').set({
    x: position.x + x,
    y: position.y + y
    })
}
function showerror(){
    console.log("there is error in read/write");}