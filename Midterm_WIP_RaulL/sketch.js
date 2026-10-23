
let titleScreen
let level = "title"



function preload(){
  titleScreen = loadImage("TitleScreen.png")
  //firstScene =loadImage ("Scene1.png")

 
}

function setup() {
  createCanvas(900, 800);
 // titleScreen = 1
 title = 1
}

function draw() {
  background(220);
if(level == "title"){
  titleScreenLevel()
  //if(titleScreen == 1){
   // image(titleScreen,0,0,900,800)
  
}

  text(mouseX + "," + mouseY, 20,20)
}


function titleScreenLevel(){
  image(titleScreen,0,0,900,800)

//Textbox
fill(42, 21, 54)
strokeWeight(2)
rect(376,324,150,150,20)

//text
fill(255, 233, 64)
//textSize(13)
text("PRESS S TO START",390,390,150)
textSize(13)
 
if(keyIsPressed){
  if(key=="s"){
    level = "start"
  }
}
}