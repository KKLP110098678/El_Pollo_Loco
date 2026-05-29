/**
 * @author Ramon Kunz
 * @description This class represents the main character in the game, extending the Creature class. It handles the character's animations (idle, walking, jumping, hurt, dead), movement (left, right, jump), and interactions (throwing bottles). The character's state is updated based on keyboard input and its position is updated accordingly.
 */
class Character extends Creature {
    constructor() {
        super();
        this.x = 120;
        this.y = 270;
        this.loadImage(characterImages.IDLE[0]);
        this.loadImages(characterImages.IDLE);
        this.loadImages(characterImages.WALKING);
        this.loadImages(characterImages.JUMPING);
        this.loadImages(characterImages.HURT);
        this.loadImages(characterImages.DEAD);
        this.width = 50;
        this.height = 150;
        this.hitboxHeight = 90;
        this.animate();
        this.applyGravity();
        this.move();
        this.life = 5;
    }

    /**
     * @method isAboveGround
     * @description Checks if the character is above the ground level (y < 270). This is used to determine if the character can jump or if it should be affected by gravity.
     * @returns {boolean} - Returns true if the character is above the ground, false otherwise.
     */
    isAboveGround() {
        return this.y < 270;
    }

    /**
     * @method jump
     * @description Makes the character jump by setting its vertical speed.
     */
    jump() {
        this.speedY = 10;
    }

    /**
     * @method move
     * @description Handles the character's movement based on keyboard input. It checks for right and left movement, as well as jumping. The character's position is updated accordingly, and the camera position is adjusted to follow the character.
     */
    move() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX - this.width) {
                this.moveRight(5);
            }
            if (this.world.keyboard.LEFT && this.x > 100) {
                this.moveLeft(5);
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    /**
     * @method throwBottle
     * @description Creates a new throwable object (bottle) at the character's position and adds it to the world's throwable objects array. The bottle is thrown in the direction the character is facing.
     */
    throwBottle() {
        let bottle = new ThrowableObject(this.x, this.y + 50);
        bottle.throw(this.otherDirection);
        this.world.throwableObjects.push(bottle);
    }


    /**
     * @method animate
     * @description Handles the character's animations based on the current state (idle, walking, jumping) and keyboard input.
     */
    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
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
            } else {
                let i = this.currentImage % characterImages.IDLE.length;
                this.img = this.imageCache[characterImages.IDLE[i]];
                this.currentImage++;
            }
        }, 1000 / 10);
    }
}