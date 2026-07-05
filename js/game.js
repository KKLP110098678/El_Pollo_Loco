/**
 * Game.js
 * @author: Ramon Kunz
 * @description: This file initializes the game and creates a new world.
 * @version: 1.0
 */

let canvas;
let world;
let keyboard = new Keyboard();
let currentLevelNumber = null;
let completedLevels = new Set();

/* Game settings */
let isFullscreen = false;
let gameVolume = 1;
let debugMode = false;

function setGameVolume(value) {
    gameVolume = parseFloat(value);
}

function showSettings() {
    document.getElementById('settingsModal').style.display = 'flex';
}

function hideSettings() {
    document.getElementById('settingsModal').style.display = 'none';
}

function showKeybindings() {
    document.getElementById('keybindingsModal').style.display = 'flex';
}

function hideKeybindings() {
    document.getElementById('keybindingsModal').style.display = 'none';
}

/**
 * @function startGame
 * @description Starts the game by hiding the start screen and initializing the game world with the selected level. It takes a level number as an argument to determine which level to load.
 * @param {number} levelNumber - The number of the level to start (e.g., 1 or 2).
 */
function startGame(levelNumber) {
    currentLevelNumber = levelNumber;
    let startScreen = document.getElementById('startScreen');
    if (startScreen) {
        startScreen.style.display = 'none';
    }
    if (levelNumber === 1) {
        initGame(createLevel1());
    } else if (levelNumber === 2) {
        initGame(createLevel2());
    }
}

/**
 * @function markLevelCompleted
 * @description Marks the current level as completed and shows the green badge next to the level button.
 */
function markLevelCompleted() {
    if (currentLevelNumber === null) return;
    completedLevels.add(currentLevelNumber);
    let badge = document.getElementById('level' + currentLevelNumber + 'Badge');
    if (badge) {
        badge.style.display = 'inline-block';
    }
}

 /**
 * @function initGame
 * @description Initializes the game by setting up the canvas and creating a new world with the specified level.
 * @param {Object} level - The level configuration object to initialize the game with.
 */
function initGame(level) {
    canvas = document.getElementById('gameCanvas');
    world = new World(canvas, keyboard, level);
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

window.addEventListener("keypress", (event) => {
    if (event.code === 'KeyF') {
        world.character.throwBottle();
    }
});

(function initIntroScreen() {
    let introScreen = document.getElementById('introScreen');
    let startScreen = document.getElementById('startScreen');

    function proceedToLevelMenu() {
        introScreen.style.display = 'none';
        startScreen.style.display = 'flex';
        window.removeEventListener('keydown', proceedToLevelMenu);
        window.removeEventListener('click', proceedToLevelMenu);
    }

    window.addEventListener('keydown', proceedToLevelMenu);
    window.addEventListener('click', proceedToLevelMenu);
})();

function toggleFullscreen() {
    let canvas = document.getElementById('gameCanvas');
    if (!isFullscreen) {
        isFullscreen = true;
        document.documentElement.requestFullscreen();
        document.getElementById('startScreen').classList.add('fullscreen-container');
    } else {
        isFullscreen = false;
        document.exitFullscreen();
        document.getElementById('startScreen').classList.remove('fullscreen-container');
    }
}
