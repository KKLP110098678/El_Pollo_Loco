/**
 * Game.js
 * @author: Ramon Kunz
 * @description: Main game loop and game logic
 * @version: 1.0
 */

let canvas;
let ctx;
let character = new MovableObject();

function initGame() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    character.img = new Image();
    character.img.src = 'img/2_character_pepe/1_idle/idle/I-1.png'; // Load the character image
    character.img.onload = function() {
        ctx.drawImage(character.img, 20 , 20, 50, 150); // Draw the character at position (50, 50)
    };
}