export let board;
export let boardWidth = 450;
export let boardHeight = 725;
export let context;

export function initializeBoard() {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");
}
