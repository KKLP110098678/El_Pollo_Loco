class MobileButton extends MovableObject {
    constructor(id, img, x, y) {
        super();
        this.id = id;
        this.loadImage(img);
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
    }
}