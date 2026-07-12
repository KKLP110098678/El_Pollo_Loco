class Collectable extends MovableObject {
    constructor(img, x, y) {
        super();
        this.loadImage(img);
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.hitboxHeight = 40;
        this.hitboxWidth = 20;
        this.bottomOffset = 3;
        this.audio = new Audio('assets/sounds/pickupBottle.wav');
    }
}