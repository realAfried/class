const colorPicker = document.querySelector('#colorPicker');
const speed = document.querySelector('#speed');
const radius = document.querySelector('#radius');
const ball = document.querySelector('#ball');
const theCanvas = document.querySelector('#theCanvas');
const context = theCanvas.getContext('2d');
const clear = document.querySelector('#clear');
const balls = [];
let ballNumber = 0;

function sizeCanvas(){
    theCanvas.height = window.innerHeight;
    theCanvas.width = window.innerWidth;
};
sizeCanvas();

function oppositeColor(hex) {
    const num = parseInt(hex.slice(1), 16);
    const flipped = 0xffffff - num;
    return '#' + flipped.toString(16).padStart(6, '0');
}

window.addEventListener('resize',sizeCanvas);

class Ball{
    constructor(x,y,color,radius,dx,dy){
        this.x = x;
        this.y= y;
        this.color = color;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.num = ++ballNumber;
    }
    static clear(){
        context.clearRect(0,0, theCanvas.width, theCanvas.height);
    };

    draw(){
        context.fillStyle = this.color;
        
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        context.fill();
        context.closePath();
    };

    text(){
        context.fillStyle = oppositeColor(this.color);
        context.font = `${this.radius}px Arial`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.beginPath();
        context.fillText(this.num, this.x, this.y)
        context.closePath();
    }

    move(){
        this.x += this.dx;
        this.y += this.dy;

       /*  console.log(this.radius)
        console.log(this.x + this.radius);
        console.log(this.y + this.radius); */
        if (this.x > theCanvas.width || this.x  < 0) {
            this.dx = -this.dx;
        }
        if (this.y > theCanvas.height || this.y < 0) {
            this.dy = -this.dy;
        }
    }
}

setInterval(()=>{
    Ball.clear();
    for(const b of balls){
        b.draw();
        b.text();
        b.move();
    };
},10)

ball.addEventListener('click',()=>{
    const newBall = new Ball(50,50,colorPicker.value,parseInt(radius.value),parseInt(speed.value),parseInt(speed.value));
    balls.push(newBall);
});

clear.addEventListener('click',()=>{
    Ball.clear();
    balls.length = 0;
    ballNumber = 0;
})