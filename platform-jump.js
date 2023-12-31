import { initializeBoard} from './board.js';
import {moveBunny, placePlatforms, stopBunny, update} from "./game.js";
import {drawBunny} from "./bunny.js";
import {drawPlatforms} from "./platforms.js";


window.onload = function () {
    initializeBoard();
    drawBunny();
    drawPlatforms();
    placePlatforms();
    requestAnimationFrame(update);
    document.addEventListener("keydown", moveBunny);
    document.addEventListener("keyup", stopBunny);
}