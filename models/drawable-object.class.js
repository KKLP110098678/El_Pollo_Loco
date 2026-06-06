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
    
    isColliding(object) {
        return this.x <= object.x + object.width &&
               this.x + this.width >= object.x &&
               this.y <= object.y + object.height &&
               this.y + this.height >= object.y;
    }
}
