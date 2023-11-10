let velocityX = 0; //move speed
let velocityY = 0; //bunny jump speed
export let gravity = 0.4;

export function getVelocityX() {
    return velocityX;
}

export function setVelocityX(value) {
    velocityX = value;
}

export function getVelocityY() {
    return velocityY;
}

export function setVelocityY(value) {
    velocityY = value;
}

export function isBunnyOnPlatform(bunny, platform) {
    return bunny.x < platform.x + platform.width &&
        bunny.x + bunny.width > platform.x &&
        bunny.y < platform.y + platform.height &&
        bunny.y + bunny.height > platform.y &&
        bunny.y + bunny.height <= platform.y + platform.height / 2; // Checks if the bottom edge of the bunny is below half of the platform height.
}
