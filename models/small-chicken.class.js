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