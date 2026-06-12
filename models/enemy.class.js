class Enemy extends Npc {
    constructor() {
        super();
    }

    hit() {
        if (this.isHurt) return;

        this.health -= 1;
        if (this.health < 1) {
            this.isDead = true;
        } else {
            this.isHurt = true;
            setTimeout(() => {
                this.isHurt = false;
            }, 1000);
        }
    }
}
