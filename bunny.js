import {boardHeight, boardWidth, context} from "./board.js";

export let bunnyWidth = 65;
let bunnyHeight = 100;
let bunnyX =  boardWidth/2 - bunnyWidth/2;
let bunnyY = boardHeight*6/7 - bunnyHeight/2;
export let bunnyImgRight;
export let bunnyImgLeft;

export let bunny = {
    img : null,
    x : bunnyX,
    y : bunnyY,
    width : bunnyWidth,
    height : bunnyHeight
}

export function drawBunny() {
    bunnyImgRight = new Image();
    bunnyImgRight.src = "images/bunny2_stand_right.png";
    bunny.img = bunnyImgRight;
    bunnyImgRight.onload = function () {
        context.drawImage(bunny.img, bunny.x, bunny.y, bunny.width, bunny.height);
    }

    bunnyImgLeft = new Image();
    bunnyImgLeft.src = "images/bunny2_stand_left.png";
}

export function getBunnyWidth() {
    return bunnyWidth;
}