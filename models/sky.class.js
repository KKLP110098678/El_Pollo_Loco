/**
 * @author Ramon Kunz
 * @description This class represents the sky background in the game, extending the MovableObject class. It initializes the sky's position, dimensions, and image. The sky is a static background element that does not move or interact with other objects in the game.
 */

class Sky extends MovableObject {
    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.width = 2880;
        this.height = 480;
        this.loadImage('assets/img/5_background/layers/air.png');
    }
}