/**
 * @author Ramon Kunz
 * @description This class represents a throwable object (bottle) in the game, extending the MovableObject class. It handles the bottle's animations (rotation and splash), movement (throwing in a direction), and interactions (removing the bottle after it splashes). The bottle's state is updated based on its speed and position, and it is removed from the world after the splash animation is completed.
 */

class ThrowableObject extends MovableObject {
    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
    }

    /**
     * @method throw
     * @description Throws the bottle in a specified direction by setting its horizontal and vertical speeds. The bottle will move in the air and eventually fall to the ground, where it will play the splash animation.
     * @param {boolean} direction - The direction to throw the bottle (true for left, false for right).
     */
    throw(direction) {
        this.speedY = 10;
        if (direction) {
            this.speedX = -20;
        } else {
            this.speedX = 20;
        }
        this.applyAcceleration();
        this.applyGravity();
        this.animate();
    }

    /**
     * @method animate
     * @description Animates the bottle based on its current state (rotation or splash). The method uses setInterval to continuously update the bottle's image based on its speed and position.
     */
    animate() {
        let splashing = false;
        setInterval(() => {
            if (this.speedY == 0) {
                this.playAnimation(this.IMAGES_SPLASH);
                if (!splashing) {
                    splashing = true;
                    setTimeout(() => {
                        let index = world.throwableObjects.indexOf(this);
                        if (index >= 0) {
                            world.throwableObjects.splice(index, 1);
                        }
                    }, 1000);
                }
            } else {
                this.playAnimation(this.IMAGES_ROTATION);
            }
        }, 100);
    }

    /**
     * @method isAboveGround
     * @description Checks if the bottle is above the ground level (y < 380). This is used to determine if the bottle should continue falling or if it has hit the ground.
     * @returns {boolean} - Returns true if the bottle is above the ground, false otherwise.
     */
    isAboveGround() {
        return this.y < 380;
    }

    /**
     * @method playAnimation
     * @description Plays the specified animation by updating the bottle's image based on the current frame. The method cycles through the images in the provided array.
     * @param {string[]} images - An array of image paths representing the animation frames.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}