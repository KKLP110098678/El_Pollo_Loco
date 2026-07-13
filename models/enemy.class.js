class Enemy extends Npc {
    constructor() {
        super();
        this.lastHitTime = 0; // Timestamp of the last hit
    }

    /**
     * @method hit
     * @description Handles the logic for when the enemy is hit. If the enemy is already hurt, it does nothing. Otherwise, it decreases the enemy's health by 1. If the health drops below 1, it sets the enemy's state to dead. If the enemy is still alive after being hit, it sets the hurt state to true for a short duration (1 second) before allowing it to be hit again.
     */
    hit() {
        this.health -= 1;
        if (this.health < 1) {
            this.isDead = true;
        } else {
            this.isHurt = true;
            this.lastHitTime = Date.now(); // Update the last hit time
        }
    }

    resetHurtState() {
        const currentTime = Date.now();
        if (this.isHurt && currentTime - this.lastHitTime >= 1000) {
            this.isHurt = false;
        }
    }
}
