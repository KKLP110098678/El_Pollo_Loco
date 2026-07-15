class EggBomb extends ThrowableObject {
    IMAGES_EXPLOSION = [
        'assets/img/12_egg/chicken-bombE1.png',
        'assets/img/12_egg/chicken-bombE2.png',
        'assets/img/12_egg/chicken-bombE3.png',
    ];
    IMAGES_ROTATION = [
        'assets/img/12_egg/chicken-bomb.png'
    ];

    constructor(x, y) {
        super(x, y);
        this.width = 175;
        this.height = 130;
        this.hitboxHeight = 110;
        this.hitboxWidth = 90;
        this.bottomOffset = 10;
        this.loadImage(this.IMAGES_ROTATION[0]);
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_EXPLOSION);
    }

    /**
     * @method animate
     * @description Animates the egg bomb based on its current state (falling or splashing). The method uses setInterval to continuously update the egg bomb's image based on its state and current image index. If the egg bomb is falling, it rotates the image. If it has splashed, it displays the splash images in sequence and removes the egg bomb from the world after the animation is completed.
     * 
    */

    animate() {
        let splashing = false;
        let interval = setInterval(() => {
            if (this.hasExploded || (this.speedY === 0 && !this.isAboveGround())) {
                this.playOneTimeAnimation(this.IMAGES_EXPLOSION);
                if (!splashing) {
                    splashing = true;
                    setTimeout(() => {
                        let index = world.throwableObjects.indexOf(this);
                        if (index >= 0) {
                            world.throwableObjects.splice(index, 1);
                            interval = clearInterval(interval);
                        }
                    }, 400);
                }
            } else {
                this.playRepeatedAnimation(this.IMAGES_ROTATION);
            }
        }, 100);
    }

    playOneTimeAnimation(images) {
        let i = 0;
        let interval = setInterval(() => {
            if (i < images.length) {
                this.img = this.imageCache[images[i]];
                i++;
            } else {
                clearInterval(interval);
            }
        }, 100);
    }

    playRepeatedAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}
