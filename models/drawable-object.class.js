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
    
    getHitbox() {
        let hHeight = this.hitboxHeight || this.height;
        return {
            x: this.x,
            y: this.y + (this.height - hHeight),
            width: this.width,
            height: hHeight
        };
    }

    isColliding(object) {
        let h1 = this.getHitbox();
        let h2 = object.getHitbox();
        
        return h1.x <= h2.x + h2.width &&
               h1.x + h1.width >= h2.x &&
               h1.y <= h2.y + h2.height &&
               h1.y + h1.height >= h2.y;
    }
}