/**
 * @author Ramon Kunz
 * @description This class represents a movable object in the game. It handles the object's movement, gravity, and acceleration. Other classes, such as Character, extend this class to inherit these functionalities.
 */

class MovableObject {
    imageCache = {};
    currentImage = 0;
    otherDirection = false;
    speedY = 0;
    speedX = 0;
    acceleration = 1;

    /**
     * @method loadImage
     * @description Loads a single image and sets it as the current image for the object.
     * @param {string} path - The path to the image to be loaded.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * @method loadImages
     * @description Loads an array of images into the image cache for later use in animations. Each image is created as a new Image object and stored in the cache with its path as the key.
     * @param {string[]} array - An array of image paths to be loaded into the cache.
     */
    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

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
        setInterval(() => {
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

    isColliding(object) {
        return this.x < object.x + object.width &&
               this.x + this.width > object.x &&
               this.y < object.y + object.height &&
               this.y + this.height > object.y;
    }
}