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
let gameVolume = localStorage.getItem('gameVolume') ? parseFloat(localStorage.getItem('gameVolume')) : 1;
let musicVolume = localStorage.getItem('musicVolume') ? parseFloat(localStorage.getItem('musicVolume')) : 0.5;
let debugMode = false;
let isPausedByOrientation = false;
let backgroundMusic = null;
const coarsePointer = window.matchMedia('(pointer: coarse)');
let isTouchMode = coarsePointer.matches;
coarsePointer.addEventListener('change', (e) => { isTouchMode = e.matches; });

function checkOrientation() {
    const isPortrait = window.innerHeight > window.innerWidth;
    const hint = document.getElementById('orientationHint');
    if (isPortrait) {
        hint.style.display = 'flex';
        if (world && !world.isPaused) {
            world.isPaused = true;
            isPausedByOrientation = true;
            const btn = document.getElementById('pauseBtn');
            if (btn) btn.textContent = '▶';
        }
    } else {
        hint.style.display = 'none';
        if (world && isPausedByOrientation) {
            isPausedByOrientation = false;
            world.isPaused = false;
            world.draw();
            const btn = document.getElementById('pauseBtn');
            if (btn) btn.textContent = '⏸';
        }
    }
}

window.addEventListener('resize', checkOrientation);

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

function togglePause() {
    if (!world) return;
    let btn = document.getElementById('pauseBtn');
    let menu = document.getElementById('pauseMenu');
    if (world.isPaused) {
        world.isPaused = false;
        world.draw();
        if (btn) btn.textContent = '⏸';
        if (menu) menu.style.display = 'none';
        if (backgroundMusic) backgroundMusic.play();
    } else {
        world.isPaused = true;
        if (btn) btn.textContent = '▶';
        if (menu) menu.style.display = 'flex';
        if (backgroundMusic) backgroundMusic.pause();
    }
}

function returnToMainMenu() {
    stopBackgroundMusic();
    for (let i = 1; i < 9999; i++) {
        window.clearInterval(i);
    }
    if (world) {
        world.isPaused = false;
        world.exitToStartScreen();
    }
    let menu = document.getElementById('pauseMenu');
    if (menu) menu.style.display = 'none';
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
    let pauseBtn = document.getElementById('pauseBtn');
    if (pauseBtn) {
        pauseBtn.style.display = 'block';
        pauseBtn.textContent = '⏸';
    }
    if (levelNumber === 1) {
        initGame(createLevel1());
    } else if (levelNumber === 2) {
        initGame(createLevel2());
    }
    startBackgroundMusic();
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
