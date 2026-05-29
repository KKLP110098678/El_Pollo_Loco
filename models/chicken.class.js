class Chicken extends Npc {
    constructor() {
        super();
        this.x = 140 + Math.random() * 200;
        this.y = 370;
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(chickenImages.WALKING);
        this.loadImages(chickenImages.DEAD);
        this.width = 50;
        this.height = 50;
        this.hitboxHeight = this.height;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.isWalking) {
                let i = this.currentImage % chickenImages.WALKING.length;
                this.img = this.imageCache[chickenImages.WALKING[i]];
                this.currentImage++;
            }
        }, 1000 / 10);
    }
}   