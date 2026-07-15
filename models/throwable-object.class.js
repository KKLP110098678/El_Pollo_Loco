/**
 * @author Ramon Kunz
 * @description This class represents a throwable object (bottle) in the game, extending the MovableObject class. It handles the bottle's animations (rotation and splash), movement (throwing in a direction), and interactions (removing the bottle after it splashes). The bottle's state is updated based on its speed and position, and it is removed from the world after the splash animation is completed.
 */

class ThrowableObject extends MovableObject {

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
    }

    /**
     * @method throw
     * @description Throws the bottle in a specified direction by setting its horizontal and vertical speeds. The bottle will move in the air and eventually fall to the ground, where it will play the splash animation.
     * @param {boolean} direction - The direction to throw the bottle (true for left, false for right).
     * @param {number} speedY - The vertical speed of the bottle when thrown.
     */
    throw(direction, speedY = 10, speedX = 20) {
        this.speedY = speedY;
        if (direction) {
            this.speedX = -speedX;
        } else {
            this.speedX = speedX;
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
        let interval = setInterval(() => {
            if (this.hasExploded || (this.speedY === 0 && !this.isAboveGround())) {
                this.playAnimation(this.IMAGES_SPLASH);
                if (!splashing) {
                    splashing = true;
                    setTimeout(() => {
                        let index = world.throwableObjects.indexOf(this);
                        if (index >= 0) {
                            world.throwableObjects.splice(index, 1);
                            interval = clearInterval(interval);
                        }
                    }, 1000);
                }
            } else {
                this.playAnimation(this.IMAGES_ROTATION);
            }
        }, 100);
    }

    /**
     * @method explode
     * @description Sets the bottle's state to exploded, stopping its movement and preventing further interactions. This method is called when the bottle hits an object or the ground, triggering the splash animation.
     */
    explode() {
        this.hasExploded = true;
        this.speedX = 0;
        this.speedY = 0;
        clearInterval(this.gravityInterval);
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