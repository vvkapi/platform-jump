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
}
