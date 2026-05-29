class Creature extends MovableObject {
    constructor() {
        super();
        this.hitboxHeight = this.height;
        this.isHurt = false;
    }

    isDead() {
        return this.energy <= 0;
    }

    hit() {
        this.life -= 1;
        this.isHurt = true;
        setTimeout(() => {
            this.isHurt = false;
        }, 1000);
    }
}