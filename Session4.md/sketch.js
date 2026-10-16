/*
Name: Raul Luna
Theme: Flower stem/ layout but you click
 to add different color petals
*/
function setup() {
  createCanvas(600, 600);
  background(183, 237, 235)
}

//flower stem 
function draw() {

fill(76, 196, 49)
rect (0,500,600,100);
fill(84, 168, 66)

rect(285,450,30,90);
fill(255, 255, 227)
circle (300,450,50);

}


// 'Petals'
function keyPressed(){
    fill(random(255), random(255),random(255));
  strokeWeight(0);
  circle(mouseX,mouseY,40)
}

// Blue circles to 'erase' the petals
function mousePressed(){
  fill(183, 237, 235);
  strokeWeight(0);
  circle(mouseX,mouseY,40)
}
