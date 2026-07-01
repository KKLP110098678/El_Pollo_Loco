/**
 * @author Ramon Kunz
 * @description This class represents a movable object in the game. It handles the object's movement, gravity, and acceleration. Other classes, such as Character, extend this class to inherit these functionalities.
 */

class MovableObject extends DrawableObject {
    imageCache = {};
    currentImage = 0;
    otherDirection = false;
    speedY = 0;
    speedX = 0;
    acceleration = 1;

    /**
     * @method moveRight
     * @description Moves the object to the right by increasing its x-coordinate. It also sets the otherDirection property to false, indicating that the object is facing right.
     */
    moveRight(px) {
        this.x += px;
        this.otherDirection = false;
    }

    /**
     * @method moveLeft
     * @description Moves the object to the left by decreasing its x-coordinate. It also sets the otherDirection property to true, indicating that the object is facing left.
     */
    moveLeft(px) {
        this.x -= px;
        this.otherDirection = true;
    }

    /**
     * @method applyGravity
     * @description Applies gravity to the object, causing it to fall downwards if it is above the ground. The method uses setInterval to continuously update the object's vertical position based on its speed and acceleration.
     */
    applyGravity() {
        this.gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.speedY = 0;
                if (this.currentFallingY !== undefined) {
                    this.y = this.currentFallingY;
                }
            }
        }, 1000 / 25);
    }

    /**
     * @method applyAcceleration
     * @description Applies acceleration to the object's horizontal movement. It gradually increases or decreases the object's speed based on the current acceleration value.
     */
    applyAcceleration() {
        setInterval(() => {
            if (this.speedX > 0) {
                this.x += this.speedX;
                this.speedX -= this.acceleration;
            } 
            if (this.speedX < 0) {
                this.x += this.speedX;
                this.speedX += this.acceleration;
            }
        }, 1000 / 25);
    }
}