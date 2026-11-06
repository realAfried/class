const theCanvas = document.querySelector('#theCanvas');

const context = theCanvas.getContext('2d');

const SNAKE_SIZE = 64;

function sizeCanvas() {
  theCanvas.width = window.innerWidth - (window.innerWidth % SNAKE_SIZE);
  theCanvas.height = window.innerHeight - (window.innerHeight % SNAKE_SIZE);
}
sizeCanvas();
window.addEventListener('resize', sizeCanvas);

const snakeHead = document.createElement('img');
snakeHead.src = 'snakeHead.png';
const snakeBody = document.createElement('img');
snakeBody.src = 'snakeBody.svg';
const apple = document.createElement('img');
apple.src = 'apple.svg';
let gameLoop;

let x = -SNAKE_SIZE;
let y = 0;
let direction = 'ArrowRight';
let score = 0;
let appleX = Math.floor(Math.random() * (theCanvas.width / SNAKE_SIZE)) * SNAKE_SIZE;
let appleY = Math.floor(Math.random() * (theCanvas.height / SNAKE_SIZE)) * SNAKE_SIZE;
const snakeSegments = [{x,y}];
let speed = 500;

snakeHead.onload = () => {
  startGameLoop();
};

window.addEventListener('keydown', e => {
  switch(e.key) {
    case 'ArrowUp':
    case 'ArrowDown':
    case 'ArrowLeft':
    case 'ArrowRight':
      direction = e.key;
      break;
    default:
      console.log(`${e.key} not processed`);
  }
});

function gameOver() {
  context.clearRect(0, 0, theCanvas.width, theCanvas.height);
  context.fillStyle = 'red';
  context.font = `3em Cursive`;
  const gameOverText = `Game Over - Score: ${score}`;
  // gameOverText.split();
  // console.log(gameOverText)
  const gameOverLegnth = context.measureText(gameOverText);
  const x = (theCanvas.width - gameOverLegnth.width) /2;
  const y = theCanvas.height/2;
  context.fillText(gameOverText,x,y);
  const audio = new Audio('gameover.mp3');
  audio.play();
}

function addApple() {
  context.drawImage(apple, appleX, appleY);
  return {x: appleX, y: appleY};
};

function appleSound(){
  const audio = new Audio('appleSound.mp3');
  audio.play();
}

function startGameLoop(){
  gameLoop = setInterval(() => {
    context.clearRect(0, 0, theCanvas.width, theCanvas.height);

    switch(direction) {
      case 'ArrowUp':
        y -= SNAKE_SIZE;
        break;
      case 'ArrowDown':
        y += SNAKE_SIZE;
        break;
      case 'ArrowLeft':
        x -= SNAKE_SIZE;
        break
      case 'ArrowRight':
        x += SNAKE_SIZE;
        break;
    }
    snakeSegments.unshift({x,y});
   
    const applePosition = addApple();

    context.fillStyle = 'green';
    context.font = '32px Cursive';
    const scoreText = `Score: ${score}`;
    const metrics = context.measureText(scoreText);
    context.fillText(scoreText, (theCanvas.width - metrics.width) - 10, 36);

    if(applePosition.x == x && applePosition.y == y){
      score++;
      appleSound();
      appleX = Math.floor(Math.random() * (theCanvas.width / SNAKE_SIZE)) * SNAKE_SIZE;
      appleY = Math.floor(Math.random() * (theCanvas.height / SNAKE_SIZE)) * SNAKE_SIZE;
      if(speed > 100){
        speed -= 25;
      }
      clearInterval(gameLoop);
      startGameLoop();
    }else{
      snakeSegments.pop();
    }

    snakeSegments.forEach((seg ,index) =>{
      if(index == 0){
       context.drawImage(snakeHead, seg.x, seg.y);
      }
      else{
        context.drawImage(snakeBody, seg.x,seg.y)
      }
    })

    if (x >= theCanvas.width || x < 0 || y >= theCanvas.height || y < 0 || checkCollision(x, y, snakeSegments)) {
      gameOver();
      clearInterval(gameLoop);
    }   

  }, speed);
}       

function checkCollision(x, y, snakeSegments) {
  const hitSegment = snakeSegments.some((segment, index) => {
    if (index === 0) return false;
    return segment.x === x && segment.y === y;
  });
  return hitSegment;
};
