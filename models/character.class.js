/**
 * @author Ramon Kunz
 * @description This class represents the main character in the game, extending the Creature class. It handles the character's animations (idle, walking, jumping, hurt, dead), movement (left, right, jump), and interactions (throwing bottles). The character's state is updated based on keyboard input and its position is updated accordingly.
 */
class Character extends Creature {
    constructor() {
        super();
        this.x = 120;
        this.y = 270;
        this.currentFallingY = this.y;
        this.loadImage(characterImages.IDLE[0]);
        this.loadImages(characterImages.IDLE);
        this.loadImages(characterImages.SLEEPING);
        this.loadImages(characterImages.WALKING);
        this.loadImages(characterImages.JUMPING);
        this.loadImages(characterImages.HURT);
        this.loadImages(characterImages.DEAD);
        this.lastMoveTime = Date.now();
        this.width = 50;
        this.height = 150;
        this.hitboxHeight = 90;
        this.animate();
        this.applyGravity();
        this.move();
        this.life = 5;
        this.coins = 0;
        this.ammo = 5;
        this.bottle_throwed = false;
        this.throw_audio = new Audio('assets/sounds/throw.wav');
    }


    /**
     * @method isAboveGround
     * @description Checks if the character is above the ground level (y < 270). This is used to determine if the character can jump or if it should be affected by gravity.
     * @returns {boolean} - Returns true if the character is above the ground, false otherwise.
     */
    isAboveGround() {
        return this.y < this.currentFallingY;
    }

    /**
     * @method isStomping
     * @description Returns true when the character is falling downward and the character's
     * feet are in the upper half of the enemy – i.e. a jump-stomp from above.
     * @param {MovableObject} enemy - The enemy to check against.
     * @returns {boolean}
     */
    isStomping(enemy) {
        let charFeet = this.y + this.height;
        let enemyMid = enemy.y + enemy.height * 0.5;
        return this.speedY < 0 && charFeet <= enemyMid;
    }

    /**
     * @method jump
     * @description Makes the character jump by setting its vertical speed.
     */
    jump() {
        this.speedY = 16;
    }

    /**
     * @method move
     * @description Handles the character's movement based on keyboard input. It checks for right and left movement, as well as jumping. The character's position is updated accordingly, and the camera position is adjusted to follow the character.
     */
    move() {
        setInterval(() => {
            if (this.isDead) return;
            if (this.world && this.world.isPaused) return;
            if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX - this.width) {
                this.moveRight(5);
                this.lastMoveTime = Date.now();
            }
            if (this.world.keyboard.LEFT && this.x > 100) {
                this.moveLeft(5);
                this.lastMoveTime = Date.now();
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.lastMoveTime = Date.now();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    /**
     * @method throwBottle
     * @description Creates a new throwable object (bottle) at the character's position and adds it to the world's throwable objects array. The bottle is thrown in the direction the character is facing.
     */
    throwBottle() {
        if (this.bottle_throwed || this.ammo <= 0) return;
        this.lastMoveTime = Date.now();
        this.throw_audio.volume = typeof gameVolume !== 'undefined' ? gameVolume : 1;
        this.throw_audio.play();
        let bottle = new ThrowableObject(this.x, this.y + 50);
        this.bottle_throwed = true;
        bottle.throw(this.otherDirection);
        this.world.throwableObjects.push(bottle);
        this.ammo -= 1;
        setTimeout(() => {
            this.bottle_throwed = false;
        }, 500);
    }


    /**
     * @method animate
     * @description Handles the character's animations based on the current state (idle, walking, jumping) and keyboard input.
     */
    animate() {
        this.animateInterval = setInterval(() => {
            if (this.isDead) {
                for (let j = 0; j < characterImages.DEAD.length; j++) {
                    setTimeout(() => {
                        this.img = this.imageCache[characterImages.DEAD[j]];
                    }, j * 100);
                }
                clearInterval(this.animateInterval);
            }
            else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                let i = this.currentImage % characterImages.WALKING.length;
                this.img = this.imageCache[characterImages.WALKING[i]];
                this.currentImage++;
            } else if (this.world.keyboard.SPACE) {
                let i = this.currentImage % characterImages.JUMPING.length;
                this.img = this.imageCache[characterImages.JUMPING[i]];
                this.currentImage++;
            } else if (this.isHurt) {
                let i = this.currentImage % characterImages.HURT.length;
                this.img = this.imageCache[characterImages.HURT[i]];
                this.currentImage++;
            } else if (Date.now() - this.lastMoveTime > 20000) {
                let i = this.currentImage % characterImages.SLEEPING.length;
                this.img = this.imageCache[characterImages.SLEEPING[i]];
                this.currentImage++;
            } else {
                let i = this.currentImage % characterImages.IDLE.length;
                this.img = this.imageCache[characterImages.IDLE[i]];
                this.currentImage++;
            }
        }, 1000 / 10);
    }
}