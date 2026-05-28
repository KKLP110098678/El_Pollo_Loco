/**
 * @author Ramon Kunz
 * @description This class represents the main character in the game, extending the MovableObject class. It handles the character's animations (idle, walking, jumping, hurt, dead), movement (left, right, jump), and interactions (throwing bottles). The character's state is updated based on keyboard input and its position is updated accordingly.
 */

class Character extends MovableObject {
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png'
    ];

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',

    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    constructor() {
        super();
        this.x = 120;
        this.y = 270;
        this.loadImage(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.width = 50;
        this.height = 150;
        this.animate();
        this.applyGravity();
        this.move();
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
                this.moveRight();
            }
            if (this.world.keyboard.LEFT && this.x > 100) {
                this.moveLeft();
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
                let i = this.currentImage % this.IMAGES_WALKING.length;
                this.img = this.imageCache[this.IMAGES_WALKING[i]];
                this.currentImage++;
            } else if (this.world.keyboard.SPACE) {
                let i = this.currentImage % this.IMAGES_JUMPING.length;
                this.img = this.imageCache[this.IMAGES_JUMPING[i]];
                this.currentImage++;
            } else {
                let i = this.currentImage % this.IMAGES_IDLE.length;
                this.img = this.imageCache[this.IMAGES_IDLE[i]];
                this.currentImage++;
            }
        }, 1000 / 10);
    }
}