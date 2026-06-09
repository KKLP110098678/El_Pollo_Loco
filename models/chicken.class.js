/**
 * @author: Ramon Kunz
 * @description This class represents a chicken NPC in the game, extending the Npc class. It initializes the chicken's position, loads its images for walking and dead states, and handles its animation. The chicken randomly walks around and can be detected by the main character, which will trigger it to walk towards the character.
 */

class Chicken extends Enemy {
    constructor() {
        super();
        this.x = 260 + Math.random() * 200;
        this.y = 370;
        this.spawnAreaX = [this.x, this.x + 200]; // Define the spawn area for chickens (between x=260 and x=460)
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(chickenImages.WALKING);
        this.loadImages(chickenImages.DEAD);
        this.width = 50;
        this.height = 50;
        this.hitboxHeight = this.height;
        this.animate();
        this.health = 1;
        this.isDead = false;
    }

    animate() {
        setInterval(() => {
            if (this.isDead) {
                this.img = this.imageCache[chickenImages.DEAD[0]];
            } else if (this.isWalking) {
                let i = this.currentImage % chickenImages.WALKING.length;
                this.img = this.imageCache[chickenImages.WALKING[i]];
                this.currentImage++;
            }
        }, 1000 / 10);
    }
}   