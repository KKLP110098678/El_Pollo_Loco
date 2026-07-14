/**
 * @author: Ramon Kunz
 * @description This class represents an egg bomb in the game, extending the MovableObject class. It handles the egg bomb's animations (rotation and splash), movement (falling down), and interactions (removing the egg bomb after it splashes). The egg bomb's state is updated based on its speed and position, and it is removed from the world after the splash animation is completed.
 */
class EggBomb extends ThrowableObject {
    IMAGES_EXPLOSION = [
        'assets/img/12_egg/chicken-bombE1.png',
        'assets/img/12_egg/chicken-bombE2.png',
        'assets/img/12_egg/chicken-bombE3.png',
    ];

    constructor(x, y) {
        super(x, y);
        this.width = 150;
        this.height = 150;
        this.loadImage('assets/img/12_egg/chicken-bomb.png');
        this.loadImages(this.IMAGES_EXPLOSION);
    }

    /**
     * @method animate
     * @description Animates the egg bomb based on its current state (falling or splashing). The method uses setInterval to continuously update the egg bomb's image based on its state and current image index. If the egg bomb is falling, it rotates the image. If it has splashed, it displays the splash images in sequence and removes the egg bomb from the world after the animation is completed.
     * 
    */
    animate() {
        this.animateInterval = setInterval(() => {
            if (this.isSplashing) {
                this.playAnimation(this.IMAGES_EXPLOSION);
                if (this.currentImageIndex === this.IMAGES_EXPLOSION.length - 1) {
                    this.removeFromWorld();
                }
            }
        }, 1000 / 60);
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        this.img = this.imageCache[images[i]];
        this.currentImage++;
    }
}