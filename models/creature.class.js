/**
 * @class Creature
 * @description The Creature class is a base class for all living entities in the game, such as the main character and NPCs. It extends the MovableObject class and adds properties and methods related to health, damage, and death. Creatures can be hit by enemies or obstacles, which reduces their life. When their life reaches zero, they are considered dead.
 * @property {number} hitboxHeight - The height of the creature's hitbox, used for collision detection.
 * @property {boolean} isHurt - Indicates whether the creature is currently hurt.
 */

class Creature extends MovableObject {
    constructor() {
        super();
        this.hitboxHeight = this.height;
        this.isHurt = false;
    }

    /**
     * 
     * @method isDead
     * @description Checks if the creature is dead by comparing its energy to zero. If the energy is less than or equal to zero, the creature is considered dead.
     * @return {boolean} - Returns true if the creature is dead, false otherwise.
     */
    isDead() {
        return this.energy <= 0; 
    }

    /**
     * @method hit
     * @description Reduces the creature's life by one and sets the isHurt property to true. After a short delay, the isHurt property is reset to false, allowing the creature to be hit again.
     */
    hit() {
        this.life -= 1;
        this.isHurt = true;
        setTimeout(() => {
            this.isHurt = false;
        }, 1000);
    }
}