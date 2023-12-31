import {board, context, getBoardHeight, getBoardWidth} from "./board.js";
import {
    bunny,
    bunnyImgJumpLeft,
    bunnyImgJumpRight,
    bunnyImgLeft,
    bunnyImgRight,
    getBunnyWidth, resetBunny
} from "./bunny.js";
import {clearPlatforms, platformArray, platformHeight, platformImg, platformWidth} from "./platforms.js";
import {
    getVelocityX,
    getVelocityY,
    gravity, isBunnyOnPlatform,
    setVelocityX,
    setVelocityY
} from "./physics.js";

let isMovingRight = false;
let isMovingLeft = false;
let isJumping = false;
let hasJumped = false;
let score = 0;
let gameOver = false;

// Function that updates the game state (called at each frame of animation).
export function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    // Bunny position update
    bunny.x += getVelocityX();
    if (bunny.x > board.width) {
        bunny.x = -getBunnyWidth();
    } else if (bunny.x + getBunnyWidth() < 0) {
        bunny.x = board.width;
    }
    setVelocityY(getVelocityY() + gravity);
    bunny.y += getVelocityY();
    if (bunny.y > getBoardHeight()) {
        gameOver = true;
    }

    // Drawing platforms
    for (let i = 0; i < platformArray.length; i++) {
        let platform = platformArray[i];
        if (getVelocityY() < 0 && bunny.y < getBoardHeight() * 3 / 4) {
            platform.y -= -7;
        }
        // Checking collisions with platforms
        if (isBunnyOnPlatform(bunny, platform) && getVelocityY() >= 0) {
            isJumping = false;
            bunny.y = platform.y - bunny.height; // Positioning the bunny on the surface of the platform
            setVelocityY(0);

            // Check if the bunny has jumped
            if (hasJumped) {
                hasJumped = false;
                bunny.img = bunnyImgRight;
                updateScore();
            }
        }
        context.drawImage(
            platform.img,
            platform.x,
            platform.y,
            platform.width,
            platform.height
        );

        // Clear platforms and add new platform
        while (platformArray.length > 0 && platformArray[0].y >= getBoardHeight()) {
            platformArray.shift();
            newPlatform();
        }
    }

    // Score
    context.fillStyle = "black";
    context.font = "bold 20px monospace";
    context.fillText("Score: " + score, 10, 25);

    if (gameOver) {
        context.fillText("Game over. Press Space to restart", getBoardWidth() / 10, getBoardHeight() / 2) //TODO: In the middle, regardless of the number of letters
    }

    // Drawing a bunny
    context.drawImage(bunny.img, bunny.x, bunny.y, bunny.width, bunny.height);
}


// Function that supports bunny movement
export function moveBunny(e) {
    if (e.code === "ArrowRight" || e.code === "KeyD") {
        isMovingRight = e.type === "keydown";
        bunny.img = isJumping ? bunnyImgJumpRight : bunnyImgRight;
    }
    if (e.code === "ArrowLeft" || e.code === "KeyA") {
        isMovingLeft = e.type === "keydown";
        bunny.img = isJumping ? bunnyImgJumpLeft : bunnyImgLeft;
    }

    if (isMovingRight || isMovingLeft) {
        setVelocityX(isMovingRight ? 5 : -5);
    } else {
        setVelocityX(0);
    }

    if ((e.code === "Space" || e.code === "ArrowUp") && !isJumping) {
        setVelocityY(-7);
        isJumping = true;
        hasJumped = true;
        bunny.img = isMovingRight ? bunnyImgJumpRight : bunnyImgJumpLeft;
    }
    if (e.code === "Space" && gameOver) {
        resetBunny();
        setVelocityX(0);
        setVelocityY(0);
        score = -1;
        gameOver = false;
        placePlatforms();
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
    clearPlatforms();
    // Starting platform
    let platform = {
        img: platformImg,
        x: board.width / 2,
        y: board.height - 65,
        height: platformHeight,
        width: platformWidth,
    };

    platformArray.push(platform);

    // Randomly place additional platforms
    for (let i = 0; i < 6; i++) {
        let randomX = Math.floor(Math.random() * (board.width - platformWidth));

        let platform = {
            img: platformImg,
            x: randomX,
            y: getBoardHeight() - 100 * i - 150,
            height: platformHeight,
            width: platformWidth,
        };

        platformArray.push(platform);
    }
}

function newPlatform() { //TODO: Condition so bunny can jump
    let randomX = Math.floor(Math.random() * (board.width - platformWidth));

    let platform = {
        img: platformImg,
        x: randomX,
        y: -platformHeight,
        height: platformHeight,
        width: platformWidth,
    };

    platformArray.push(platform);
}

function updateScore() {
    score += 1;
}
