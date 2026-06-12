class BossChicken extends Chicken {
    constructor(x, y) {
        super(x, y);
        this.loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(BossChickenImages.WALKING);
        this.loadImages(BossChickenImages.ALERT);
        this.loadImages(BossChickenImages.ATTACK);
        this.loadImages(BossChickenImages.HURT);
        this.loadImages(BossChickenImages.DEAD);
        this.width = 150;
        this.height = 150;
        this.hitboxHeight = this.height;
        this.health = 5;
        this.isBoss = true;
        this.x = x;
        this.y = y;
    }

    animate() {
        this.animateInterval = setInterval(() => {
            if (this.isDead) {
                this.img = this.imageCache[BossChickenImages.DEAD[0]];
                setTimeout(() => {
                    this.img = this.imageCache[BossChickenImages.DEAD[1]];
                }, 500);
                setTimeout(() => {                    
                    this.img = this.imageCache[BossChickenImages.DEAD[2]];
                }, 1000);
                clearInterval(this.animateInterval);
            } else if (this.isHurt) {
                let i = this.currentImage % BossChickenImages.HURT.length;
                this.img = this.imageCache[BossChickenImages.HURT[i]];
                this.currentImage++;
            } else if (this.isAttacking) {
                let i = this.currentImage % BossChickenImages.ATTACK.length;
                this.img = this.imageCache[BossChickenImages.ATTACK[i]];
                this.currentImage++;
            } else if (this.isAlert) {
                let i = this.currentImage % BossChickenImages.ALERT.length;
                this.img = this.imageCache[BossChickenImages.ALERT[i]];
                this.currentImage++;
            } else {
                let i = this.currentImage % BossChickenImages.WALKING.length;
                this.img = this.imageCache[BossChickenImages.WALKING[i]];
                this.currentImage++;
            }
        }, 1000 / 10);
    }
}