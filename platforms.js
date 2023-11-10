export let platformImg;
export let platformArray = [];
export let platformWidth = 80;
export let platformHeight = 16;

export function drawPlatforms() {
    platformImg = new Image();
    platformImg.src = "images/ground_wood_small.png";
}

export function clearPlatforms() {
    platformArray = [];
}
