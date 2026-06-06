class Coin extends MovableObject {
    IMAGE = "img/8_coin/coin_2.png";
    constructor(x, y) {
        super();
        this.loadImage(this.IMAGE);
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