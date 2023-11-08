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
let bunnyImgRight;
let bunnyImgLeft;

//physics
let velocityX = 0;

//platforms
let platformArray = [];
let platformWidth = 80;
let platformHeight =  25;
let platformImg;

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

    //load images
    bunnyImgRight = new Image();
    bunnyImgRight.src = "images/bunny2_stand_right.png";
    bunny.img = bunnyImgRight;
    bunnyImgRight.onload = function () {
        context.drawImage(bunny.img, bunny.x, bunny.y, bunny.width, bunny.height);
    }

    bunnyImgLeft = new Image();
    bunnyImgLeft.src = "images/bunny2_stand_left.png";

    platformImg = new Image();
    platformImg.src = "images/ground_wood_small.png";

    placePlatforms();
    requestAnimationFrame(update);
    document.addEventListener("keydown", moveBunny);
}

//game loop
function update () {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    //bunny
    bunny.x += velocityX;
    if (bunny.x > boardWidth) {
        bunny.x = -bunnyWidth;
    }
    else if (bunny.x + bunnyWidth < 0) {
        bunny.x = boardWidth;
    }
    context.drawImage(bunny.img, bunny.x, bunny.y, bunny.width, bunny.height);

    for (let i = 0; i < platformArray.length; i++) {
        let platform = platformArray[i];
        context.drawImage(platform.img, platform.x, platform.y, platform.width, platform.height);
    }
}

function moveBunny(e) {
    if (e.code === "ArrowRight" || e.code === "KeyD") {
        velocityX = 5;
        bunny.img = bunnyImgRight;
    }
    if (e.code === "ArrowLeft" || e.code === "KeyA") {
        velocityX = -5;
        bunny.img = bunnyImgLeft;
    }
}

function placePlatforms() {
    platformArray = [];

    //starting platforms
    let platform = {
        img : platformImg,
        x : boardWidth/2,
        y : boardHeight - 50,
        height : platformHeight,
        width : platformWidth
    }

    platformArray.push(platform);
}
