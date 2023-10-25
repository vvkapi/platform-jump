//board
let board;
let boardWidth = 450;
let boardHeight = 725;
let context;

//bunny
let bunnyWidth = 65;
let bunnyHeight = 100;
let bunnyX =  boardWidth/2 - bunnyWidth/2;
let bunnyY = boardHeight*6/7 - bunnyHeight/2;
let bunnyImg;
let bunnyImgJump;

//physics
let velocityX = 0;

let bunny = {
    img : null,
    x : bunnyX,
    y : bunnyY,
    width : bunnyWidth,
    height : bunnyHeight
}

window.onload = function () {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    //load bunny
    bunnyImg = new Image();
    bunnyImg.src = "./bunny2_stand.png";
    bunny.img = bunnyImg;
    bunnyImg.onload = function () {
        context.drawImage(bunny.img, bunny.x, bunny.y, bunny.width, bunny.height);
    }

    bunnyImgJump = new Image();
    bunnyImgJump.src = "./bunny2_jump.png";

    requestAnimationFrame(update);
    document.addEventListener("keydown", moveBunny);
}

//game loop
function update () {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    bunny.x += velocityX;
    context.drawImage(bunny.img, bunny.x, bunny.y, bunny.width, bunny.height);
}

function moveBunny(e) {
    if (e.code === "ArrowRight" || e.code === "KeyD") {
        velocityX = 5;
    }
    if (e.code === "ArrowLeft" || e.code === "KeyA") {
        velocityX = -5;
    }
}

