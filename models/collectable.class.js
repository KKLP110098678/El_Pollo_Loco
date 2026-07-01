class Collectable extends MovableObject {
    constructor(img, x, y) {
        super();
        this.loadImage(img);
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.audio = new Audio('assets/sounds/pickupBottle.wav');
    }
}