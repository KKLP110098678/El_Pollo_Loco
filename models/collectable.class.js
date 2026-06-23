class Collectable extends MovableObject {
    constructor(img, x, y) {
        super();
        this.loadImage(img);
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
    }
        
    /**
     * @method destroy
     * @description Removes the collectable object from the world.coins array, effectively destroying it. This method is called when the collectable is collected by the player or needs to be removed from the game.
     */
    destroy() {
        let index = world.coins.indexOf(this);
        if (index > -1) {
            world.coins.splice(index, 1);
        }
    }
}