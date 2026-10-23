/* RAUL LUNA
PING PONG GAME IN ARACDE MACHINE 
8 BIT STYLE
MIDTERM FINAL
HOW TO PLAY:
 - 2PLAYER GAME
 - LEFT PLAYER USES 'W' (UP) & 'S' (DOWN) KEYS TO MOVE UP AND DOWN
 - RIGHT PLAYER USES UP & DOWN ARROW KEYS TO MOVE UP AND DOWN
 - FIRST TO 5 POINTS WINS!!!1
*/

//VARIABLES
let titleScreen;
let pixelFont;
let gameplay;
let gameOverImage;
let level = "title";
let paddleLeftY, paddleRightY;
let ballX, ballY, ballSpeedX, ballSpeedY;
let leftScore = 0;
let rightScore = 0;
const winningScore = 5;
const paddleHeight = 80;
const paddleWidth = 12;
const ballSize = 15;

//PHOTOBACKGROUNDS
function preload() {
  titleScreen = loadImage("TitleScreen.png");
  pixelFont = loadFont("PixelifySans.ttf");
  gameplay = loadImage("BackgroundPlay.png");
  gameOverImage = loadImage("GameOver.png");
}

function setup() {
  createCanvas(900, 800);
  resetGame();
}

function draw() {
  background(220);
  textFont(pixelFont);

  if (level === "title") {
    titleScreenLevel();
  } else if (level === "actualgame") {
    gamePlay();
  } else if (level === "gameOver") {
    showGameOver();
  }

  // MOUSE COORDINATES TO HELP FIND THE EXACT POINTS
  fill(255);
  textSize(14);
  textAlign(LEFT, TOP);
  text(mouseX + ", " + mouseY, 20, 20);
}

function keyPressed() {
  if (level === "title" && key.toLowerCase() === "s") {
    leftScore = 0;
    rightScore = 0;
    resetGame();
    level = "actualgame";
  } else if (level === "gameOver" && key === " ") {
    leftScore = 0;
    rightScore = 0;
    resetGame();
    level = "actualgame";
  }
}

function resetGame() {
  paddleLeftY = height / 2 - paddleHeight / 2;
  paddleRightY = height / 2 - paddleHeight / 2;
  resetBall();
}

function resetBall() {
  ballX = width / 2;
  ballY = height / 2;

  let direction = random() > 0.5 ? 1 : -1;
  ballSpeedX = 4 * direction;
  ballSpeedY = random(-3, 3);
}
//FIRST STATE/OPENING
function titleScreenLevel() {
  image(titleScreen, 0, 0, width, height);

  // Start button
  fill(42, 21, 54);
  strokeWeight(2);
  rect(376, 324, 150, 150, 20);

  fill(255, 233, 64);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  text("PRESS S TO START", 451, 399);
}
//SECOND STATE
function gamePlay() {
  image(gameplay, 0, 0, width, height);

  
  stroke(255);
  line(width / 2, 0, width / 2, height);
  noStroke();
//SCORE BOARD
  fill(255);
  textSize(32);
  textAlign(CENTER, TOP);
  text(leftScore, width / 4, 40);
  text(rightScore, (3 * width) / 4, 40);

  //PADDLES
  handlePaddles();

  rect(20, paddleLeftY, paddleWidth, paddleHeight);
  rect(
    width - 20 - paddleWidth,
    paddleRightY,
    paddleWidth,
    paddleHeight
  );

  //MOVEMENT OF THE BALL
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  ellipse(ballX, ballY, ballSize, ballSize);

  //BOUNCE OFF
  if (
    ballY - ballSize / 2 <= 0 ||
    ballY + ballSize / 2 >= height
  ) {
    ballSpeedY *= -1;
  }

  // LEFT PADDLE COLLISION
  if (
    ballSpeedX < 0 &&
    ballX - ballSize / 2 <= 20 + paddleWidth &&
    ballX + ballSize / 2 >= 20 &&
    ballY + ballSize / 2 >= paddleLeftY &&
    ballY - ballSize / 2 <= paddleLeftY + paddleHeight
  ) {
    ballSpeedX *= -1.05;
    ballX = 20 + paddleWidth + ballSize / 2;
  }

  // RIGHT PADDLE COLLISION
  let rightPaddleX = width - 20 - paddleWidth;
//BALL SPEED
  if (
    ballSpeedX > 0 &&
    ballX + ballSize / 2 >= rightPaddleX &&
    ballX - ballSize / 2 <= rightPaddleX + paddleWidth &&
    ballY + ballSize / 2 >= paddleRightY &&
    ballY - ballSize / 2 <= paddleRightY + paddleHeight
  ) {
    ballSpeedX *= -1.05;
    ballX = rightPaddleX - ballSize / 2;
  }

  // SCORE WHEN THE BALL PASSES PLAYER
  if (ballX + ballSize / 2 < 0) {
    rightScore++;
    checkWin();

    if (level === "actualgame") {
      resetBall();
    }
  } else if (ballX - ballSize / 2 > width) {
    leftScore++;
    checkWin();

    if (level === "actualgame") {
      resetBall();
    }
  }
}
// HAND PADDLES FUNCTION
function handlePaddles() {
  // LEFT PLAYER'S CONTROL (W AND S KEYS)
  if (keyIsDown(87)) {
    paddleLeftY = max(0, paddleLeftY - 5);
  }

  if (keyIsDown(83)) {
    paddleLeftY = min(
      height - paddleHeight,
      paddleLeftY + 5
    );
  }

  // RIGHT PLAYER'S CONTROL (UP AND DOWN ARROWS)
  if (keyIsDown(UP_ARROW)) {
    paddleRightY = max(0, paddleRightY - 5);
  }

  if (keyIsDown(DOWN_ARROW)) {
    paddleRightY = min(
      height - paddleHeight,
      paddleRightY + 5
    );
  }
}

function checkWin() {
  if (leftScore >= winningScore || rightScore >= winningScore) {
    level = "gameOver";
  }
}
//THIRD STATE
function showGameOver() {
  image(gameOverImage, 0, 0, width, height);

  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(15);

  let winner =
    leftScore >= winningScore
      ? "Left Player Wins!"
      : "Right Player Wins!";

  text(winner,448,378) ;

  textSize(10);
  text("Press SPACE to Play Again", width / 2, height / 1.8);
}