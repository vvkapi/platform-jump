// game.js
import { board, context } from "./board.js";
import {bunny, bunnyImgLeft, bunnyImgRight, getBunnyWidth} from "./bunny.js";
import {platformArray, platformHeight, platformImg, platformWidth} from "./platforms.js";
import {detectCollision, getVelocityX, getVelocityY, gravity, setBaseY, setVelocityX, setVelocityY} from "./physics.js";

export function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    //bunny
    bunny.x += getVelocityX();
    if (bunny.x > board.width) {
        bunny.x = -getBunnyWidth();
    } else if (bunny.x + getBunnyWidth() < 0) {
        bunny.x = board.width;
    }
    setVelocityY(getVelocityY()+gravity);
    bunny.y += getVelocityY();
    context.drawImage(bunny.img, bunny.x, bunny.y, bunny.width, bunny.height);

    for (let i = 0; i < platformArray.length; i++) {
        let platform = platformArray[i];
        if (detectCollision(bunny, platform) && getVelocityY() >= 0) {
            setBaseY();
        }
        context.drawImage(
            platform.img,
            platform.x,
            platform.y,
            platform.width,
            platform.height
        );
    }
}

let isMovingRight = false;
let isMovingLeft = false;

export function moveBunny(e) {
    if (e.code === "ArrowRight" || e.code === "KeyD") {
        isMovingRight = e.type === "keydown";
        bunny.img = bunnyImgRight;
    }
    if (e.code === "ArrowLeft" || e.code === "KeyA") {
        isMovingLeft = e.type === "keydown";
        bunny.img = bunnyImgLeft;
    }

    if ((isMovingRight && !isMovingLeft) || (!isMovingRight && isMovingLeft)) {
        setVelocityX(isMovingRight ? 5 : -5);
    } else {
        setVelocityX(0);
    }
}

export function stopBunny(e){
    if ((e.code === "ArrowRight" || e.code === "KeyD") && isMovingRight) {
        isMovingRight = false;
        setVelocityX(isMovingLeft ? -5 : 0);
    }
    if ((e.code === "ArrowLeft" || e.code === "KeyA") && isMovingLeft) {
        isMovingLeft = false;
        setVelocityX(isMovingRight ? 5 : 0);
    }
}


export function placePlatforms() {
    let platform = {
        img: platformImg,
        x: board.width / 2,
        y: board.height - 50,
        height: platformHeight,
        width: platformWidth,
    };

    platformArray.push(platform);

    platform = {
        img: platformImg,
        x: board.width / 2,
        y: board.height - 175,
        height: platformHeight,
        width: platformWidth,
    };

    platformArray.push(platform);
}
