import { board, context } from "./board.js";
import {bunny, bunnyImgLeft, bunnyImgRight, getBunnyWidth} from "./bunny.js";
import { platformImg } from "./platforms.js";
import {
    detectCollision,
    getVelocityX,
    getVelocityY,
    gravity,
    setVelocityX,
    setVelocityY
} from "./physics.js";

let isMovingRight = false;
let isMovingLeft = false;
let isJumping = false;

let platformArray = [];
let platformWidth = 80;
let platformHeight = 16; //TODO: Zmien na gettery i settery do platforms.js

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
    // Skok
    if (isJumping) {
        setVelocityY(getVelocityY() + gravity);
        bunny.y += getVelocityY();
    }

    context.drawImage(bunny.img, bunny.x, bunny.y, bunny.width, bunny.height);

    for (let i = 0; i < platformArray.length; i++) {
        let platform = platformArray[i];
        // Sprawdzenie kolizji z platformą
        if (detectCollision(bunny, platform)) {
            // Jeśli królik dotyka platformy, zatrzymaj skok
            isJumping = false;
            bunny.y = platform.y - bunny.height; // Ustaw królika na powierzchni platformy
            setVelocityY(0);
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
    // Skok po naciśnięciu spacji
    if ((e.code === "Space" || e.code === "ArrowUp") && !isJumping) {
        setVelocityY(-12);
        isJumping = true;
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
    platformArray = [];
    let platform = {
        img: platformImg,
        x: board.width / 2,
        y: board.height - 50,
        height: platformHeight,
        width: platformWidth,
    };

    platformArray.push(platform);
}
