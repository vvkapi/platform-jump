let velocityX = 0;
let velocityY = 0;
let initialVelocityY = -8;
export let gravity = 0.4;

export function getVelocityX() {
    return velocityX;
}

export function setVelocityX(value) {
    velocityX = value;
}

export function setBaseY() {
    velocityY = initialVelocityY;
}

export function getVelocityY() {
    return velocityY;
}

export function setVelocityY(value) {
    velocityY = value;
}

export function detectCollision(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}