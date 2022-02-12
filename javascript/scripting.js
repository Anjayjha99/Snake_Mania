//Game Constants
let inputDir = {x: 0, y: 0};
const foodSound = new Audio('./music/food.mp3');
const gameOverSound = new Audio('../music/gameover.mp3');
const moveSound = new Audio('../music/move.mp3');
const musicSound = new Audio('../music/music.mp3');
let speed = 7;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 3}
];
let Score = 0;
let food = {x:6, y: 7}
let incspeed = 0;
//Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function gameEngine(){
    //Updating Snakearr and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0, y:0};
        alert("Game Over!!! Press any key to play again");
        snakeArr = [{x:13, y: 3}]
        Score = 0;
        score.innerHTML = "Score: " + Score;
        musicSound.play();
    } 

    // If you have eaten the food increment the snakearr and relocate the food
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        if (incspeed==2) {
            speed++;
            incspeed = 0;
        } else {
            incspeed++;
        }
        foodSound.play();
        Score += 1;
        if(Score>hiscoreval){
            hiscoreval = Score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "High Score: " + hiscoreval;
        }
        score.innerHTML = "Score: " + Score; 
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    //Display the snake
    board.innerHTML = "";
    snakeArr.forEach((el,index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = el.y;
        snakeElement.style.gridColumnStart = el.x;
        if(index === 0){
            snakeElement.classList.add('snakehead');
        }else{
            snakeElement.classList.add('snakebody');
        }
        board.appendChild(snakeElement);
    });

    // Display the food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('snakefood');
    board.appendChild(foodElement);
}



//Main logic
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score: " + hiscoreval;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});
