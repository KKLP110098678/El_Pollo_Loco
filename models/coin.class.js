class Coin extends Collectable {
    constructor(x, y, img) {
        super(x, y, img);
        this.amount = 1;
        this.audio = new Audio('assets/sounds/pickupCoin.wav');
    }
}

