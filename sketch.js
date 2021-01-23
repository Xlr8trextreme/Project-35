var ball;
var database;
var position;
var bgimg,balloonimg;

function preload(){
bgimg = loadImage("images/City.png")
balloonimg = loadImage("images/balloon.png");
}
function setup(){
    createCanvas(1500,700);
    database=firebase.database();
    ball = createSprite(250,250,10,10);
   // ball.shapeColor = "red";
   ball.addImage(balloonimg)

    //. ref() - refers to a node in db
    // .on()= listens to a node .ref is refering to
    // .update()- updates the node .ref is referring to
    // .set() - set the value .ref is referring to
    // .remove() - to remove the node  .ref is referring to
    var hearref = database.ref('ball/position');
    hearref.on("value",readPosition,showError)
}

function draw(){
    background(bgimg);
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
    textSize(24);
    fill("red");
    stroke("yellow");
    text("Use arrow keys to move the hot air balloon",100,100)

}
function readPosition(data){
    position = data.val()
    ball.x = position.x
    ball.y = position.y

}

function writePosition(x,y){
   database.ref('ball/position').update({
       x:position.x+x,
       y:position.y+y,
   })
  
}

function showError(){
    console.log("Some error");
}