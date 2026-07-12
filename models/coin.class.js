class Coin extends Collectable {
    constructor(x, y, img) {
        super(x, y, img);
        this.amount = 1;
        this.hitboxHeight = 20;
        this.hitboxWidth = 20;
        this.bottomOffset = 15;
        this.audio = new Audio('assets/sounds/pickupCoin.wav');
    }
}

