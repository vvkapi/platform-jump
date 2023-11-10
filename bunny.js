import {boardHeight, boardWidth, context} from "./board.js";

let bunnyWidth = 55;
let bunnyHeight = 80;
let bunnyX =  boardWidth/2 - bunnyWidth/2;
let bunnyY = boardHeight*6/7 - bunnyHeight/2;
export let bunnyImgRight;
export let bunnyImgLeft;
export let bunnyImgJumpLeft;
export let bunnyImgJumpRight;
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
    bunnyImgJumpRight = new Image();
    bunnyImgJumpRight.src = "images/bunny2_jump_right.png";

    bunnyImgJumpLeft = new Image();
    bunnyImgJumpLeft.src = "images/bunny2_jump_left.png";
}

export function getBunnyWidth() {
    return bunnyWidth;
}

export function resetBunny() {
    bunny = {
        img : bunnyImgRight,
        x : bunnyX,
        y : bunnyY,
        width : bunnyWidth,
        height : bunnyHeight
    }
}