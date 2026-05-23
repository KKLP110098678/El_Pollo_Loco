/**
 * Game.js
 * @author: Ramon Kunz
 * @description: This file initializes the game and creates a new world.
 * @version: 1.0
 */

let canvas;
let world;

function initGame() {
    canvas = document.getElementById('gameCanvas');
    world = new World(canvas);
    console.log('My Character is: ', world.character);
}

window.addEventListener("keypress", (event) => {
    if (event.code === 'KeyD') {
        world.character.moveRight();
    }
    else if (event.code === 'KeyA') {
        world.character.moveLeft();
    }
});
