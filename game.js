// game.js
import { board, context } from "./board.js";
import { bunny, bunnyImgLeft, bunnyImgRight, bunnyWidth } from "./bunny.js";
import { platformImg } from "./platforms.js";
import { getVelocityX, setVelocityX } from "./physics.js";

let platformArray = [];
let platformWidth = 80;
let platformHeight = 16;

function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    //bunny
    bunny.x += getVelocityX();
    if (bunny.x > board.width) {
        bunny.x = -bunnyWidth;
    } else if (bunny.x + bunnyWidth < 0) {
        bunny.x = board.width;
    }
    context.drawImage(bunny.img, bunny.x, bunny.y, bunny.width, bunny.height);

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

function moveBunny(e) {
    if (e.code === "ArrowRight" || e.code === "KeyD") {
        setVelocityX(5);
        bunny.img = bunnyImgRight;
    }
    if (e.code === "ArrowLeft" || e.code === "KeyA") {
        setVelocityX(-5);
        bunny.img = bunnyImgLeft;
    }
}

function placePlatforms() {
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

export { update, moveBunny, placePlatforms };
