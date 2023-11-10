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

export function isBunnyOnPlatform(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y &&
        a.y + a.height <= b.y + b.height / 2; // Checks if the bottom edge of the bunny is below half of the platform height.
}
