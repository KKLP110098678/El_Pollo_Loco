class Enemy extends Npc {
    constructor() {
        super();
    }

    /**
     * @method hit
     * @description Handles the logic for when the enemy is hit. If the enemy is already hurt, it does nothing. Otherwise, it decreases the enemy's health by 1. If the health drops below 1, it sets the enemy's state to dead. If the enemy is still alive after being hit, it sets the hurt state to true for a short duration (1 second) before allowing it to be hit again.
     */
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
