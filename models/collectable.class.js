class Collectable extends MovableObject {
    constructor(img, x, y) {
        super();
        this.loadImage(img);
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
    }
        
    destroy() {
        let index = world.coins.indexOf(this);
        if (index > -1) {
            world.coins.splice(index, 1);
        }
    }
}