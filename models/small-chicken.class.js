class SmallChicken extends Chicken {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.spawnAreaX = [this.x, this.x + 200];
        this.width = 40;
        this.height = 40;
        this.hitboxWidth = 36;
        this.hitboxHeight = 38;
        this.loadImage(smallChickenImages.WALKING[0]);
        this.loadImages(smallChickenImages.WALKING);
        this.loadImages(smallChickenImages.DEAD);
    }

    /**
     * @method animate
     * @description Animates the small chicken based on its current state (walking or dead). The method uses setInterval to continuously update the small chicken's image based on its state and current image index. If the small chicken is dead, it displays the dead image; if it's walking, it cycles through the walking images.
     */
    animate() {
        setInterval(() => {
            if (this.isDead) {
                this.img = this.imageCache[smallChickenImages.DEAD[0]];
            } else if (this.isWalking) {
                let i = this.currentImage % smallChickenImages.WALKING.length;
                this.img = this.imageCache[smallChickenImages.WALKING[i]];
                this.currentImage++;
            }
        }, 1000 / 10);
    }
}