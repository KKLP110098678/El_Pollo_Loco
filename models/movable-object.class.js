class MovableObject {
    imageCache = {};
    currentImage = 0;
    otherDirection = false;
    speedY = 0;
    speedX = 0;
    acceleration = 1;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {
        this.x += 5;
        this.otherDirection = false;
    }

    moveLeft() {
        this.x -= 5;
        this.otherDirection = true;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }
}