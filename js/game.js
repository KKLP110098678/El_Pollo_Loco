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
    console.log('My Character is: ', world.character);
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
