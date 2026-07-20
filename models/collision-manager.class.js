class CollisionManager {
    
    
    constructor(world) {
        this.world = world; // Reference to the game world
        this.checkCollisions();
    }
    
    /**
     * @method checkCollisions
     * @description Checks for collisions between the main character and chickens, as well as between throwable objects and chickens. If a collision is detected, the appropriate hit or explode methods are called on the involved objects.
     */
    checkCollisions() {
        setInterval(() => {
            if (this.world.isPaused) return;
            this.checkEnemyCollisions();
            this.checkThrowableCollisions([this.world.chicken, this.world.smallChickens, this.world.bossChickens, [this.world.character]]);
            this.checkGroundCollisions();
            this.checkItemCollisions();
        }, 1000 / 60);
    }

    /**
     * @method checkEnemyCollisions
     * @description Checks for collisions between the main character and chickens. If a collision is detected, the character is hit. The method also checks for collisions with boss chickens and handles the win condition if the final boss is defeated.
     */
    checkEnemyCollisions() {
        this.checkNormalEnemyCollisions(this.world.chicken);
        this.checkNormalEnemyCollisions(this.world.smallChickens);
        this.checkbossCollisions(this.world.bossChickens);
        if (this.world.character.isDead) {
            this.world.handleGameOver();
        }
    }

    checkNormalEnemyCollisions(enemyArray) {
        enemyArray.forEach(enemy => {
            if (this.world.character.isColliding(enemy) && !enemy.isDead) {
                if (this.world.character.isStomping(enemy)) {
                    enemy.hit();
                    this.world.character.speedY = 12;
                } else {
                    this.world.character.hit(1, true); // Contact damage from normal enemies
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
            if (boss.isColliding(this.world.character) && !this.world.character.isDead) {
                if (boss.isStomping(this.world.character)) {
                    this.world.character.hit(5); // Reduce character's health by 5 when stomping on a boss
                    boss.speedY = 12;
                } else {
                    this.world.character.hit(1, true); // Contact damage from boss chicken
                }
            }
            if (boss.isFinalBoss && boss.isDead) {
                this.world.showWinScreen();
            }
        });
    }


    /**
     * @method checkThrowableCollisions
     * @param {Array} enemyArrays - An array of arrays containing enemy objects (chickens, small chickens, boss chickens) to check for collisions with throwable objects (bottles).
     * @description Checks for collisions between throwable objects (bottles) and chickens. If a collision is detected, the chicken is hit, and the bottle explodes. The method also checks for collisions with boss chickens.
     */
    checkThrowableCollisions(enemyArrays) {
        this.world.throwableObjects.forEach(bottle => {
            enemyArrays.forEach(enemyArray => {
                if (bottle.hasExploded) return;
                enemyArray.forEach(enemy => {
                    if (bottle instanceof EggBomb && enemy == this.world.character) {
                        if (bottle.isColliding(this.world.character) && !this.world.character.isDead) {
                            this.world.character.hit(5); // Reduce character's health by 5 when hit by an egg bomb
                            bottle.explode();
                        }
                    } else if (bottle instanceof Bottle && enemy instanceof Chicken) {
                        if (bottle.isColliding(enemy) && !enemy.isDead) {
                            enemy.hit();
                            bottle.explode();
                        }
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
        this.checkCharacterGroundCollisions();
        this.checkBossGroundCollisions(); // Check for boss chicken ground collisions as well
    }

    // Checks for collisions between the main character and boss chickens
    checkBossGroundCollisions() {
        let onGround = false;
        this.world.bossChickens.forEach(boss => {
            this.world.groundObjects.forEach(ground => {
            let fallingDown = boss.speedY <= 0;
            let approachingFromAbove = boss.y + boss.height <= ground.y + 20;
                if (boss.isColliding(ground) && fallingDown && approachingFromAbove) {
                    boss.currentFallingY = ground.y - boss.height + boss.bottomOffset;
                    onGround = true;
                }
            });
        });

        if (!onGround) {
            this.world.bossChickens.forEach(boss => {
                boss.currentFallingY = 200 + boss.bottomOffset;
            });
        }
    }
    
    checkCharacterGroundCollisions() {
        let onGround = false;
        this.world.groundObjects.forEach(ground => {
            let fallingDown = this.world.character.speedY <= 0;
            let approachingFromAbove = this.world.character.y + this.world.character.height <= ground.y + 20;
            if (this.world.character.isColliding(ground) && fallingDown && approachingFromAbove) {
                this.world.character.currentFallingY = ground.y - this.world.character.height + this.world.character.bottomOffset;
                onGround = true;
            }
        });
    
        if (!onGround) {
            this.world.character.currentFallingY = 270 + this.world.character.bottomOffset;
        }
    }
        
    /**
     * @method checkItemCollisions
     * @description Checks for collisions between the main character and collectible items (coins and collectable objects). If a collision is detected, the character's coin or ammo count is increased, and the item is removed from the world.
     */
    checkItemCollisions() {
        [this.world.coins, this.world.collectableObjects].forEach(itemArray => {
            itemArray.forEach((item, index) => {
                if (this.world.character.isColliding(item)) {
                    if (item instanceof Coin) {
                        this.world.character.coins += 1;
                        this.world.uiManager.coinCounter.increase(1);
                    } else if (item instanceof Collectable) {
                        this.world.character.ammo += 1;
                        this.world.uiManager.ammoCounter.increase(1);
                    }
                    item.audio.volume = typeof gameVolume !== 'undefined' ? gameVolume : 1;
                    item.audio.play();
                    itemArray.splice(index, 1);
                }
            });
        });
    }
}