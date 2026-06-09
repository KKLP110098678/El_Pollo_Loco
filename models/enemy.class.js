class Enemy extends Npc {
    constructor() {
        super();
    }

    hit() {
        this.health -= 1;
        if (this.health < 1) {
            this.isDead = true;
        }
    }
}
