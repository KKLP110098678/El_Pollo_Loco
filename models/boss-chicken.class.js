class BossChicken extends Chicken {
    constructor(x, y, isFinalBoss) {
        super(x, y);
        this.loadImage('assets/img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(BossChickenImages.WALKING);
        this.loadImages(BossChickenImages.ALERT);
        this.loadImages(BossChickenImages.ATTACK);
        this.loadImages(BossChickenImages.HURT);
        this.loadImages(BossChickenImages.DEAD);
        this.applyGravity();
        this.throwEggBomb();
        this.width = 250;
        this.height = 250;
        this.hitboxHeight = 202;
        this.hitboxWidth = 240;
        this.bottomOffset = 5;
        this.totalHealth = 5;
        this.health = this.totalHealth;
        this.isBoss = true;
        this.detectionRange = 350;
        this.spawnAreaX = [x - 100, x + 100]; // Define the spawn area for the boss chicken
        this.x = x;
        this.y = y;
        this.currentFallingY = this.y;
        this.isFinalBoss = isFinalBoss; // Flag to indicate that this is the final boss
    }

    isStomping(character) {
        let enemyFeet = this.y + this.height;
        let charMid = character.y + character.height * 0.5;
        return this.speedY < 0 && enemyFeet <= charMid;
    }

    /**
     * @method animate
     * @description Animates the boss chicken based on its current state (walking, alert, attacking, hurt, or dead). The method uses setInterval to continuously update the boss chicken's image based on its state and current image index. If the boss chicken is dead, it displays the dead images in sequence and stops the animation.
     */
    animate() {
        this.animateInterval = setInterval(() => {
            if (this.isDead) {
                this.animateDead();
            } else if (this.isHurt) {
                this.animateHurt();
            } else if (this.isAttacking) {
                this.animateAttack();
            } else if (this.isAlert) {
                this.animateAlert();
            } else {
                this.animateWalking();
            }
        }, 1000 / 10);
    }
    
    /**
     * @method animateDead
     * @description Animates the boss chicken's dead state by displaying the dead images in sequence. It uses setTimeout to change the image at specific intervals and clears the animation interval to stop further animations.
    */
   animateDead() {
       this.img = this.imageCache[BossChickenImages.DEAD[0]];
       setTimeout(() => {
           this.img = this.imageCache[BossChickenImages.DEAD[1]];
        }, 500);
        setTimeout(() => {                    
            this.img = this.imageCache[BossChickenImages.DEAD[2]];
        }, 1000);
        clearInterval(this.animateInterval);
    }
    
    /**
     * @method animateHurt
     * @description Animates the boss chicken's hurt state by cycling through the hurt images. It resets the hurt state after the animation is complete.
    */
   animateHurt() {
       let i = this.currentImage % BossChickenImages.HURT.length;
       this.img = this.imageCache[BossChickenImages.HURT[i]];
       this.currentImage++;
       this.resetHurtState(); // Reset the hurt state after the animation
    }
    
    /**
     * @method animateAttack
     * @description Animates the boss chicken's attack state by cycling through the attack images. It uses setTimeout to change the image at specific intervals and increments the current image index after a delay.
    */
   animateAttack() {
       let i = this.currentImage % BossChickenImages.ATTACK.length;
       this.img = this.imageCache[BossChickenImages.ATTACK[i]];
       setTimeout(() => {
           this.currentImage++;
        }, 200);
    }
    
    /**
     * @method animateAlert
     * @description Animates the boss chicken's alert state by cycling through the alert images. It increments the current image index to create a looping animation effect.
    */
    animateAlert() {
        let i = this.currentImage % BossChickenImages.ALERT.length;
        this.img = this.imageCache[BossChickenImages.ALERT[i]];
        this.currentImage++;
    }

    /**
     * @method animateWalking
     * @description Animates the boss chicken's walking movement by cycling through the walking images. It increments the current image index to create a looping animation effect.
    */
    animateWalking() {
        let i = this.currentImage % BossChickenImages.WALKING.length;
        this.img = this.imageCache[BossChickenImages.WALKING[i]];
        this.currentImage++;
    }

    /**
     * @method jumpOnCharacter
     * @description Makes the boss chicken jump on the character when it is detected. The method sets the vertical speed (speedY) to make the boss chicken jump, and it also sets the horizontal speed (speedX) based on the direction of the character. The isAttacking flag is set to true during the jump, and it is reset after a specified duration.
     */
    jumpOnCharacter() {
        if (this.isDead || this.isAboveGround()) return;
        this.speedY = 15;
        this.jumpFrameIndex = 0;
        this.speedX = this.otherDirection ? -10 : 10;
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 1600);
    }
    
    /**
     * @method detect
     * @param {Character} character - The character object to detect.
     * @description Detects if the character is within the detection range of the boss chicken. It calculates the distance between the boss chicken and the character in both X and Y directions. If the character is within the detection range and is not dead, the isDetected flag is set to true; otherwise, it is set to false.
     */
    detect(character) {
        let distanceX = Math.abs(this.x - character.x);
        let distanceY = Math.abs(this.y - character.y);
        this.isDetected = distanceX < this.detectionRange && distanceY < this.detectionRange && character.isDead === false;
    }

    /**
     * @method throwEggBomb
     * @description Throws an egg bomb towards the character if the boss chicken is detected. The method uses setInterval to continuously check for detection and throw egg bombs at random intervals. The egg bomb is created and added to the world, and its throw method is called with specified speed values.
     */
    throwEggBomb() {
        setInterval(() => {
            if (this.isDead) return;
            this.detect(world.character);
            if (this.isDetected) {
                let randomSpeedX = Math.random() * 15 + 25; // Random speedX between 20 and 40
                let eggBomb = new EggBomb(this.x + this.width / 2, this.y);
                world.addObjectToMap(eggBomb);
                eggBomb.throw(this.otherDirection, 20, randomSpeedX); // Throw the egg bomb with specified speedX and speedY
                this.world.throwableObjects.push(eggBomb);
            }

        }, 1000); // Throw an egg bomb every 1 second
    }

}