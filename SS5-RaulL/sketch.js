/*
Name: [Raul Luna]
Title: Growing Circles
Instructions:
 - Move the mouse to change the circle size
 - Press s to change colors
 - Press space to change colors
*/

//VARIABLES
let colors = [
  [230, 103, 184],
  [219, 13, 145],
  [128, 29, 92],
  [255, 235, 248]
];
let colorIndex = 0;
let spacing = 60;


function setup() {
  createCanvas(800, 700);
  background(230, 186, 214);
}

function draw() {
// REPEATING CIRCLE PATTERN
  for (let x = 30; x < width; x += spacing){
    for (let y = 30; y < height; y += spacing){
      let distance = dist(mouseX,mouseY, x, y);
      let circleSize = map(distance, 0, 300, 40, 10);
      circleSize = constrain(circleSize, 10, 40);

      fill(colors[colorIndex]);
      noStroke();
      circle (x, y, circleSize);
    }
}

//DECORATIVE CIRCLE USING A WHILE LOOP
let c = 0;
while (c<5) {
  noFill();
  stroke(colors[colorIndex]);
  circle(mouseX, mouseY, 30 + c * 20);
  c++;
}
}

// CLICK TO CHANGE THE SPACING
function mousePressed(){
  spacing = random(40,90);
}

//TO CHANGE COLORS WITH SPACE OR CLEAR WITH S
function keyPressed(){
  if(key === ' '){
colorIndex = (colorIndex + 1) % colors.length;
}
if(key === 's'){
  background (230,186,214)
}
}