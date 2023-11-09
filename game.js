import {board, boardHeight, boardWidth, context} from "./board.js";
import {bunny, bunnyImgLeft, bunnyImgRight, bunnyWidth} from "./bunny.js";
import {platformImg} from "./platforms.js";

let velocityX = 0;
let platformArray = [];
let platformWidth = 80;
let platformHeight = 16;

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
    let platform = {
        img : platformImg,
        x : boardWidth/2,
        y : boardHeight - 50,
        height : platformHeight,
        width : platformWidth
    }

    platformArray.push(platform);
}


export { update, moveBunny, placePlatforms }
