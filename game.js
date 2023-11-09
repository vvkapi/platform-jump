import {board, context} from "./board.js";
import {bunny, bunnyImgLeft, bunnyImgRight, getBunnyWidth} from "./bunny.js";
import {platformArray, platformHeight, platformImg, platformWidth} from "./platforms.js";
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

// Function that updates the game state (called at each frame of animation).
export function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    // Bunny position update
    bunny.x += getVelocityX();
    if (bunny.x > board.width) {
        bunny.x = -getBunnyWidth();
    } else if (bunny.x + getBunnyWidth() < 0) {
        bunny.x = board.width;
    }
    // Jump handling
    if (isJumping) {
        setVelocityY(getVelocityY() + gravity);
        bunny.y += getVelocityY();
    }
    // Checking collisions with platforms
    for (let i = 0; i < platformArray.length; i++) {
        let platform = platformArray[i];
        if (detectCollision(bunny, platform)) {
            isJumping = false;
            bunny.y = platform.y - bunny.height; // Positioning the bunny on the surface of the platform
            setVelocityY(0);
        }
    }

    // Drawing a bunny
    context.drawImage(bunny.img, bunny.x, bunny.y, bunny.width, bunny.height);

    // Drawing a platform
    for (let i = 0; i < platformArray.length; i++) {
        let platform = platformArray[i];
        context.drawImage(
            platform.img,
            platform.x,
            platform.y,
            platform.width,
            platform.height
        );
    }
}


// Function that supports bunny movement
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
    if ((e.code === "Space" || e.code === "ArrowUp") && !isJumping) {
        setVelocityY(-12);
        isJumping = true;
    }
}

// Function to stop the bunny when the movement key is released
export function stopBunny(e) {
    if ((e.code === "ArrowRight" || e.code === "KeyD") && isMovingRight) {
        isMovingRight = false;
        setVelocityX(isMovingLeft ? -5 : 0);
    }
    if ((e.code === "ArrowLeft" || e.code === "KeyA") && isMovingLeft) {
        isMovingLeft = false;
        setVelocityX(isMovingRight ? 5 : 0);
    }
}

// Function that places platforms on the board
export function placePlatforms() {
    let platform = {
        img: platformImg,
        x: board.width / 2,
        y: board.height - 50,
        height: platformHeight,
        width: platformWidth,
    };

    platformArray.push(platform);
}
