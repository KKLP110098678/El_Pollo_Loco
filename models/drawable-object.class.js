class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;

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
     * @method getHitbox
     * @description Returns the hitbox of the object used for collision detection. The hitbox is
     * centered horizontally within the sprite. Its bottom edge sits `bottomOffset` pixels above
     * the sprite's bottom edge, so the collision area always lies fully inside the visible sprite.
     * @returns {Object} An object representing the hitbox with properties x, y, width, and height.
     */
    getHitbox() {
        let hHeight = this.hitboxHeight || this.height;
        let hWidth = this.hitboxWidth || this.width;
        let bottomOff = this.bottomOffset || 0;
        let offsetX = (this.width - hWidth) / 2;
        return {
            x: this.x + offsetX,
            y: this.y + (this.height - hHeight - bottomOff),
            width: hWidth,
            height: hHeight
        };
    }

    /**
     * @method isColliding
     * @description Checks if the current object is colliding with another object based on their hitboxes. It compares the positions and dimensions of both hitboxes to determine if they overlap.
     * @param {DrawableObject} object - The other object to check for collision against.
     * @returns {boolean} - Returns true if the objects are colliding, false otherwise.
     */
    isColliding(object) {
        let h1 = this.getHitbox();
        let h2 = object.getHitbox();
        
        return h1.x <= h2.x + h2.width &&
               h1.x + h1.width >= h2.x &&
               h1.y <= h2.y + h2.height &&
               h1.y + h1.height >= h2.y;
    }
}