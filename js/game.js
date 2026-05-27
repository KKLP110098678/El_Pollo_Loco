/**
 * Game.js
 * @author: Ramon Kunz
 * @description: This file initializes the game and creates a new world.
 * @version: 1.0
 */

let canvas;
let world;
let keyboard = new Keyboard();

function initGame() {
    canvas = document.getElementById('gameCanvas');
    world = new World(canvas, keyboard);
}

window.addEventListener("keydown", (event) => {
    if (event.code === 'KeyD') {
        keyboard.RIGHT = true;
    }
    if (event.code === 'KeyA') {
        keyboard.LEFT = true;
    }
    if (event.code === 'Space') {
        keyboard.SPACE = true;
    }
});

window.addEventListener("keyup", (event) => {
    if (event.code === 'KeyD') {
        keyboard.RIGHT = false;
    }
    if (event.code === 'KeyA') {
        keyboard.LEFT = false;
    }
    if (event.code === 'Space') {
        keyboard.SPACE = false;
    }
});

window.addEventListener("click", (event) => {
    if (event.button === 0) {
        keyboard.LEFT_CLICK = true;
        console.log('Left click detected');
    }
    if (event.button === 2) {
        keyboard.RIGHT_CLICK = true;
        console.log('Right click detected');
    }
});
