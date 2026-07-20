class UIManager {
    constructor(world) {
        this.world = world;
        this.ctx = world.ctx;
        this.healthBar = new StatusBar(20, 'assets/img/7_statusbars/3_icons/icon_health.png', 'assets/img/7_statusbars/4_bar_elements/statusbar_green.png');
        this.bossHealthBar = new StatusBar(20, 'assets/img/7_statusbars/3_icons/icon_health_endboss.png', 'assets/img/7_statusbars/4_bar_elements/statusbar_orange.png');
        this.coinCounter = new StatusCounter(60, 'assets/img/7_statusbars/3_icons/icon_coin.png');
        this.ammoCounter = new StatusCounter(108, 'assets/img/7_statusbars/3_icons/icon_salsa_bottle.png');
        this.bossHealthBar.x = this.world.canvas.width - 220;
    }

    /**
     * @method drawGui
     * @description Draws the graphical user interface (GUI) elements on the screen, such as the health bar, coin counter, ammo counter, and mobile control buttons. It updates the health bar percentage based on the character's life and updates the coin and ammo counters with the current values.
    */
   drawGui() {
        this.ctx.translate(-this.world.camera_x, 0);
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
           this.world.addObjectToMap(this.world.move_left_button);
           this.world.addObjectToMap(this.world.move_right_button);
           this.world.addObjectToMap(this.world.jump_button);
           this.world.addObjectToMap(this.world.throw_bottle_button);
        }
    }
    
    /**
     * @method drawStatusElements
     * @description Draws the status elements on the screen, including the health bar, coin counter, and ammo counter. It updates the health bar percentage based on the character's life and updates the coin and ammo counters with the current values.
     */
    drawStatusElements() {
        this.healthBar.setPercentage((this.world.character.health / this.world.character.totalHealth) * 100);
        this.world.addObjectToMap(this.healthBar);
        this.coinCounter.value = this.world.character.coins;
        this.world.addObjectToMap(this.coinCounter);
        this.ammoCounter.value = this.world.character.ammo;
        this.world.addObjectToMap(this.ammoCounter);
        this.drawBossHealthBar();
    }
    
    /**
     * @method drawBossHealthBar
     * @description Draws the boss health bar on the screen if there is a nearby boss chicken. It checks for any boss chickens that are not dead and within the detection range of the character. If a nearby boss is found, it updates the boss health bar percentage based on the boss's health and adds it to the map.
     */
    drawBossHealthBar() {
        let nearBoss = this.world.bossChickens.find(boss => !boss.isDead && Math.abs(boss.x - this.world.character.x) < boss.detectionRange);
        if (nearBoss) {
            this.bossHealthBar.setPercentage((nearBoss.health / nearBoss.totalHealth) * 100);
            this.world.addObjectToMap(this.bossHealthBar);
        }
    }

    /**
     * @method drawWinScreen
     * @description Draws the win screen on the canvas if the showWinScreenStatus flag is true. The win screen is displayed when the player defeats the final boss.
     */
    drawWinScreen() {
        if (this.showWinScreenStatus) {
            this.ctx.drawImage(this.winImage, 0, 0, this.world.canvas.width, this.world.canvas.height);
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
}