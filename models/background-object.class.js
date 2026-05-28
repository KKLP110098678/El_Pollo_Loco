/**
 * @author Ramon Kunz
 * @description This class represents a background object in the game, extending the MovableObject class. It initializes the object's position, dimensions, and image. Background objects are static elements that do not move or interact with other objects in the game.
 */

class BackgroundObject extends MovableObject {
    constructor(imagePath, x, y, width, height) {
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}