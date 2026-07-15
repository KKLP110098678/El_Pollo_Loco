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
        this.detectionRange = 330;
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
                this.img = this.imageCache[BossChickenImages.DEAD[0]];
                setTimeout(() => {
                    this.img = this.imageCache[BossChickenImages.DEAD[1]];
                }, 500);
                setTimeout(() => {                    
                    this.img = this.imageCache[BossChickenImages.DEAD[2]];
                }, 1000);
                clearInterval(this.animateInterval);
            } else if (this.isHurt) {
                let i = this.currentImage % BossChickenImages.HURT.length;
                this.img = this.imageCache[BossChickenImages.HURT[i]];
                this.currentImage++;
                this.resetHurtState(); // Reset the hurt state after the animation
            } else if (this.isAttacking) {
                let i = this.currentImage % BossChickenImages.ATTACK.length;
                this.img = this.imageCache[BossChickenImages.ATTACK[i]];
                setTimeout(() => {
                    this.currentImage++;
                }, 200);

            } else if (this.isAlert) {
                let i = this.currentImage % BossChickenImages.ALERT.length;
                this.img = this.imageCache[BossChickenImages.ALERT[i]];
                this.currentImage++;
            } else {
                let i = this.currentImage % BossChickenImages.WALKING.length;
                this.img = this.imageCache[BossChickenImages.WALKING[i]];
                this.currentImage++;
            }
        }, 1000 / 10);
    }

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
    
    detect(character) {
        let distanceX = Math.abs(this.x - character.x);
        let distanceY = Math.abs(this.y - character.y);
        this.isDetected = distanceX < this.detectionRange && distanceY < this.detectionRange && character.isDead === false;
    }

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