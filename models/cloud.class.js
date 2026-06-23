/**
 * @author Ramon Kunz
 * @description This class represents a cloud in the game, extending the MovableObject class. It initializes the cloud's position, dimensions, and image. The cloud moves slowly across the screen to create a dynamic background effect.
 */

class Cloud extends MovableObject {
    constructor() {
        super();
        this.x = 120 + Math.random() * 200;
        this.y = 50 + Math.random() * 100;
        this.loadImage('assets/img/5_background/layers/4_clouds/1.png');
        this.width = 500;
        this.height = 250;
        this.animate();
    }

    /**
     * @method animate
     * @description Animates the cloud by moving it slowly across the screen. The method uses setInterval to continuously update the cloud's position, creating a smooth movement effect.
     */
    animate() {
        setInterval(() => {
            this.x -= 0.15;
        }, 1000 / 60);
    }
}
