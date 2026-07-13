/**
 * @author Ramon Kunz
 * 
 * @description This class represents the game world, containing all game objects and handling the rendering of the game.
 * It manages the character, chickens, clouds, background objects, and throwable objects.
 * The world also handles the camera movement and the main game loop for rendering.
 */

class World {
    character = new Character();
    
    chicken;
    smallChickens;
    clouds;
    backgroundObjects;
    groundObjects;    
    collectableObjects;
    coins;
    bossChickens;
    throwableObjects = [];
    
    sky = new Sky();
    
    canvas;
    ctx;
    keyboard;
    camera_x = -100;

    healthBar = new StatusBar(20, 'assets/img/7_statusbars/3_icons/icon_health.png', 'assets/img/7_statusbars/4_bar_elements/statusbar_green.png');
    bossHealthBar = new StatusBar(20, 'assets/img/7_statusbars/3_icons/icon_health_endboss.png', 'assets/img/7_statusbars/4_bar_elements/statusbar_orange.png');
    coinCounter = new StatusCounter(60, 'assets/img/7_statusbars/3_icons/icon_coin.png');
    ammoCounter = new StatusCounter(100, 'assets/img/7_statusbars/3_icons/icon_salsa_bottle.png');
    

    move_left_button = new MobileButton('move_left', 'assets/img/11_mobile_controls/left_arrow.png', 580, 400);
    move_right_button = new MobileButton('move_right', 'assets/img/11_mobile_controls/right_arrow.png', 650, 400);
    jump_button = new MobileButton('jump', 'assets/img/11_mobile_controls/jump_arrow.png', 20, 400);
    throw_bottle_button = new MobileButton('throw_bottle', 'assets/img/11_mobile_controls/throw_bottle.png', 20, 330);

    winImage = new Image();
    showWinScreenStatus = false;
    gameoverImage = new Image();
    showGameOverScreenStatus = false;
    isPaused = false;
    

    constructor(canvas, keyboard, level) {
        this.level = level;
        this.chicken = level.chicken;
        this.smallChickens = level.smallChickens;
        this.clouds = level.clouds;
        this.backgroundObjects = level.backgroundObjects;
        this.groundObjects = level.groundObjects;
        this.collectableObjects = level.collectableObjects;
        this.coins = level.coins;
        this.bossChickens = level.bossChickens;
        
        this.winImage.src = 'assets/img/You won, you lost/You won A.png';
        this.gameoverImage.src = 'assets/img/9_intro_outro_screens/game_over/game over!.png';
        this.bossHealthBar.x = canvas.width - 220;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.checkCollisions();
    }

    /**
     * @method handleGameOver
     * @description Handles the game over state when the character dies. It plays the game over sound, shows the game over screen, and stops all intervals to end the game.
     */
    handleGameOver() {
       if (this.gameLost) return;
        playGameOverSound();
        this.gameLost = true;
        setTimeout(() => {
            this.showGameOverScreenStatus = true;
            
            // Stoppe alle Intervalle, um das Spiel zu beenden
            for (let i = 1; i < 9999; i++) {
                window.clearInterval(i);
            }
            setTimeout(() => {
                this.showGameOverScreenStatus = false;
                this.exitToStartScreen();
            }, 3000);
        }, 1500); // 1.5 Sekunden warten, damit die Sterbeanimation des Bosses noch abspielen kann
    }
    
    /**
     * @method exitToStartScreen
     * @description Exits the current game and returns to the start screen. It stops the background music, hides the pause button and menu, and resets the game state.
     */
    exitToStartScreen() {
        stopBackgroundMusic();
        let pauseBtn = document.getElementById('pauseBtn');
        if (pauseBtn) {
            pauseBtn.style.display = 'none';
            pauseBtn.textContent = '⏸';
        }
        let pauseMenu = document.getElementById('pauseMenu');
        if (pauseMenu) pauseMenu.style.display = 'none';
        this.isPaused = false;
        let startScreen = document.getElementById('startScreen');
        if (startScreen) {
            startScreen.style.display = 'flex';
            if (isFullscreen) {
                document.exitFullscreen();
                document.documentElement.requestFullscreen();
                document.getElementById('startScreen').classList.add('fullscreen-container');
            }
        }
    }


    /**
     * @method setWorld
     * @description Sets the world reference for the character, allowing the character to interact with the world and other objects.
     */
    setWorld() {
        this.character.world = this;
        this.npcArrays = [this.chicken, this.smallChickens, this.bossChickens];
        this.npcArrays.forEach(npcArray => {
            npcArray.forEach(npc => {
                npc.world = this;
                npc.detectCharacter(this.character);
            });
        });
        this.clouds.forEach(cloud => {
            cloud.world = this;
        });
        this.move_left_button.world = this;
        this.move_right_button.world = this;
        this.jump_button.world = this;
        this.throw_bottle_button.world = this;
    }

    /**
     * @method draw
     * Main game loop for rendering the game. It clears the canvas, translates the context based on the camera position, and draws all game objects in the correct order (sky, background objects, character, throwable objects, chickens, clouds).
     * It uses requestAnimationFrame for smooth rendering.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectToMap(this.sky);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addObjectToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.chicken);
        this.addObjectsToMap(this.smallChickens);
        this.addObjectsToMap(this.groundObjects);
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.bossChickens);
        this.addObjectsToMap(this.collectableObjects);
        this.drawGui();
        if (this.isPaused) return;
        requestAnimationFrame(() => this.draw());
    }
    
    /**
     * @method drawGui
     * @description Draws the graphical user interface (GUI) elements on the screen, such as the health bar, coin counter, ammo counter, and mobile control buttons. It updates the health bar percentage based on the character's life and updates the coin and ammo counters with the current values.
    */
   drawGui() {
        this.ctx.translate(-this.camera_x, 0);
        this.drawTouchControls();
        this.drawStatusElements();
        this.drawWinScreen();
        this.drawGameOverScreen();
    }
    
    /**
     * @method drawTouchControls
     * @description Draws the touch controls on the screen if the game is in touch mode. It adds the move left, move right, jump, and throw bottle buttons to the map.
    */
   drawTouchControls() {
       if (isTouchMode) {
           this.addObjectToMap(this.move_left_button);
           this.addObjectToMap(this.move_right_button);
           this.addObjectToMap(this.jump_button);
           this.addObjectToMap(this.throw_bottle_button);
        }
    }
    
    /**
     * @method drawStatusElements
     * @description Draws the status elements on the screen, including the health bar, coin counter, and ammo counter. It updates the health bar percentage based on the character's life and updates the coin and ammo counters with the current values.
     */
    drawStatusElements() {
        this.healthBar.setPercentage((this.character.life / 5) * 100);
        this.addObjectToMap(this.healthBar);
        this.coinCounter.value = this.character.coins;
        this.addObjectToMap(this.coinCounter);
        this.ammoCounter.value = this.character.ammo;
        this.addObjectToMap(this.ammoCounter);
        this.drawBossHealthBar();
    }
    
    /**
     * @method drawBossHealthBar
     * @description Draws the boss health bar on the screen if there is a nearby boss chicken. It checks for any boss chickens that are not dead and within the detection range of the character. If a nearby boss is found, it updates the boss health bar percentage based on the boss's health and adds it to the map.
     */
    drawBossHealthBar() {
        let nearBoss = this.bossChickens.find(boss => !boss.isDead && Math.abs(boss.x - this.character.x) < boss.detectionRange);
        if (nearBoss) {
            this.bossHealthBar.setPercentage((nearBoss.health / 5) * 100);
            this.addObjectToMap(this.bossHealthBar);
        }
    }
    
    /**
     * @method drawWinScreen
     * @description Draws the win screen on the canvas if the showWinScreenStatus flag is true. The win screen is displayed when the player defeats the final boss.
     */
    drawWinScreen() {
        if (this.showWinScreenStatus) {
            this.ctx.drawImage(this.winImage, 0, 0, this.canvas.width, this.canvas.height);
        }
    }

    /**
     * @method drawGameOverScreen
     * @description Draws the game over screen on the canvas if the showGameOverScreenStatus flag is true. The game over screen is displayed when the player loses.
     */
    drawGameOverScreen() {
        if (this.showGameOverScreenStatus) {
            this.ctx.drawImage(this.gameoverImage, 0, 0, this.canvas.width, this.canvas.height);
        }
    }
        
    /**
     * @method addObjectToMap
     * Adds a single object to the map, handling its rendering and any transformations (e.g., flipping for direction).
     * @param {MovableObject} object - The object to be added to the map.
     */
    addObjectToMap(object) {
        if (object.otherDirection) {
            this.flipImage(object);
        }
        this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
        if (object instanceof StatusBar) {
            this.addInformationToStatusBar(object);
        }
        if (object instanceof StatusCounter) {
            this.drawCounter(object);
        }
        if (debugMode) {
            this.visualizeHitboxes(object);
        }
        if (object.otherDirection) {
            this.ctx.restore();
        }
    }

    flipImage(object) {
        this.ctx.save();
        this.ctx.translate(object.x + object.width / 2, 0);
        this.ctx.scale(-1, 1);
        this.ctx.translate(-object.x - object.width / 2, 0);
    }
    
    /**
     * @method addInformationToStatusBar
     * @param
     * @description Draws the filled colored bar as a second layer based on the percentage of the status bar. It calculates the width of the filled bar based on the percentage and draws it on top of the status bar.
    */
   addInformationToStatusBar(object) {
       // Zeichne den gefüllten farbigen Balken als zweite Ebene basierend auf percentage
       if (object.percentageBar && object.percentageBar.complete) {
           let ratio = Math.max(0, Math.min(1, object.percentage / 100));
           let sWidth = object.percentageBar.width * ratio;
           let dWidth = object.width * ratio;
           if (sWidth > 0 && dWidth > 0) {
               this.ctx.drawImage(
                   object.percentageBar,
                   0, 0, sWidth, object.percentageBar.height,
                   object.x, object.y, dWidth, object.height
                );
            }
        }
        if (object.iconInfo) {
            // Zeichne das Icon leicht versetzt über der Statusbar
            this.ctx.drawImage(object.iconInfo, object.x - 15, object.y , 50, 50);
        }
    }

    /**
     * @method drawCounter
     * @description Draws the value of a StatusCounter object on the canvas. It sets the font and fill style, and then uses fillText to display the value at the specified position.
     * @param {StatusCounter} object - The StatusCounter object whose value is to be drawn.
     */
    drawCounter(object) {
        this.ctx.font = "23px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(object.value, object.x + 60, object.y + 33);
    }
    
    /**
     * @method visualizeHitboxes
     * @description Visualizes the hitboxes of various game objects (Character, Chicken, Collectable) by drawing rectangles around them. It also visualizes the detection range for objects that have a detection range property.
     * @param {MovableObject} object - The object for which to visualize the hitbox.
     */
    visualizeHitboxes(object) {
        if (object instanceof Character || object instanceof Chicken || object instanceof Collectable) {
            this.createRect(object, object.y, object.width, object.height, 'red');
            if (object.hitboxHeight) {
                this.createRect(object, object.y - (object.bottomOffset || 0), object.hitboxWidth, object.hitboxHeight, 'blue');
            }
            if (object.detectionRange) {
                this.createDetectionRange(object);
            }
        }
    }

    /**
     * @method createRect
     * @description Draws a rectangle around the specified object, indicating its hitbox or other relevant area.
     * @param {MovableObject} object - The object for which to draw the rectangle.
     * @param {number} height - The height of the rectangle.
     * @param {string} [color] - The color of the rectangle. Defaults to blue if not specified.
     */
    createRect(object, posY, width, height, color) {
        this.ctx.beginPath();
        this.ctx.lineWidth = '2';
        this.ctx.strokeStyle = color || 'blue';
        this.ctx.rect(object.x + (object.width - width) / 2, posY + (object.height - height), width, height);
        this.ctx.stroke();
    }

    /**
     * @method createDetectionRange
     * @description Draws a circular detection range around the specified object, indicating the area in which the object can detect other entities (e.g., the character).
     * @param {MovableObject} object - The object for which to draw the detection range.
     */
    createDetectionRange(object) {
        this.ctx.beginPath();
        this.ctx.lineWidth = '2';
        this.ctx.strokeStyle = 'green';
        this.ctx.beginPath();
        this.ctx.arc(object.x + object.width / 2, object.y + object.height / 2, object.detectionRange, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    /**
     * @method addObjectsToMap
     * @description Adds multiple objects to the map by iterating over the array and adding each object individually.
     * @param {MovableObject[]} objects - The array of objects to be added to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addObjectToMap(object);
        });
    }

    /**
     * @method checkCollisions
     * @description Checks for collisions between the main character and chickens, as well as between throwable objects and chickens. If a collision is detected, the appropriate hit or explode methods are called on the involved objects.
     */
    checkCollisions() {
        setInterval(() => {
            if (this.isPaused) return;
            this.checkEnemyCollisions();
            this.checkThrowableCollisions([this.chicken, this.smallChickens, this.bossChickens]);
            this.checkGroundCollisions();
            this.checkItemCollisions();
        }, 1000 / 60);
    }

    /**
     * @method checkEnemyCollisions
     * @description Checks for collisions between the main character and chickens. If a collision is detected, the character is hit. The method also checks for collisions with boss chickens and handles the win condition if the final boss is defeated.
     */
    checkEnemyCollisions() {
        this.checkNormalEnemyCollisions(this.chicken);
        this.checkNormalEnemyCollisions(this.smallChickens);
        this.checkbossCollisions(this.bossChickens);
        if (this.character.isDead) {
            this.handleGameOver();
        }
    }

    checkNormalEnemyCollisions(enemyArray) {
        enemyArray.forEach(enemy => {
            if (this.character.isColliding(enemy) && !enemy.isDead) {
                if (this.character.isStomping(enemy)) {
                    enemy.hit();
                    this.character.speedY = 12;
                } else {
                    this.character.hit();
                }
            }
        });
    }
    /**
     * @method checkbossCollisions
     * @description Checks for collisions between the main character and boss chickens. If a collision is detected, the character is hit. If the final boss is defeated, the win screen is displayed.
     * @param {BossChicken[]} boss - An array of boss chickens to check for collisions with the main character.
     */
    checkbossCollisions(bossArray) {
        bossArray.forEach(boss => {
            if (this.character.isColliding(boss) && !boss.isDead) {
                this.character.hit();
            }
            if (boss.isFinalBoss && boss.isDead) {
                this.showWinScreen();
            }
        });
    }


    /**
     * @method checkThrowableCollisions
     * @param {Array} enemyArrays - An array of arrays containing enemy objects (chickens, small chickens, boss chickens) to check for collisions with throwable objects (bottles).
     * @description Checks for collisions between throwable objects (bottles) and chickens. If a collision is detected, the chicken is hit, and the bottle explodes. The method also checks for collisions with boss chickens.
     */
    checkThrowableCollisions(enemyArrays) {
        this.throwableObjects.forEach(bottle => {
            enemyArrays.forEach(enemyArray => {
                if (bottle.hasExploded) return;
                enemyArray.forEach(enemy => {
                    if (bottle.isColliding(enemy) && !enemy.isDead) {
                        enemy.hit();
                        bottle.explode();
                    }
                });
            });
        });
    }

    /**
     * @method checkGroundCollisions
     * @description Checks for collisions between the main character and the ground. If a collision is detected, the character's falling position is adjusted accordingly.
     */
    checkGroundCollisions() {
        let onGround = false;
        this.groundObjects.forEach(ground => {
            let fallingDown = this.character.speedY <= 0;
            let approachingFromAbove = this.character.y + this.character.height <= ground.y + 20;
            if (this.character.isColliding(ground) && fallingDown && approachingFromAbove) {
                this.character.currentFallingY = ground.y - this.character.height + this.character.bottomOffset;
                onGround = true;
            }
        });

        if (!onGround) {
            this.character.currentFallingY = 270 + this.character.bottomOffset;
        }
    }

    /**
     * @method checkItemCollisions
     * @description Checks for collisions between the main character and collectible items (coins and collectable objects). If a collision is detected, the character's coin or ammo count is increased, and the item is removed from the world.
     */
    checkItemCollisions() {
        [this.coins, this.collectableObjects].forEach(itemArray => {
            itemArray.forEach((item, index) => {
                if (this.character.isColliding(item)) {
                    if (item instanceof Coin) {
                        this.character.coins += 1;
                        this.coinCounter.increase(1);
                    } else if (item instanceof Collectable) {
                        this.character.ammo += 1;
                        this.ammoCounter.increase(1);
            }
                    item.audio.volume = typeof gameVolume !== 'undefined' ? gameVolume : 1;
                    item.audio.play();
                    itemArray.splice(index, 1);
    }
            });
        });
    }

    /**
     * @method showWinScreen
     * @description Displays the win screen when the final boss is defeated and stops the game.
     */
    showWinScreen() {
        if (this.gameWon) return;
        this.gameWon = true;
        playVictorySoundWithDrums(gameVolume);

        setTimeout(() => {
            this.showWinScreenStatus = true;
            markLevelCompleted();
            
            // Stoppe alle Intervalle, um das Spiel zu beenden
            for (let i = 1; i < 9999; i++) {
                window.clearInterval(i);
            }

            setTimeout(() => {
                this.showWinScreenStatus = false;
                this.exitToStartScreen();
            }, 3000);
        }, 1500); // 1.5 Sekunden warten, damit die Sterbeanimation des Bosses noch abspielen kann
    }
}