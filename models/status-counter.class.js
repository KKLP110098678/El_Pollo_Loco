class StatusCounter extends MovableObject {
    constructor(y, img) {
        super();
        this.x = 10;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.value = 0;
        this.loadImage(img);
    }

    /**
     * @method increase
     * @description Increases the value of the status counter by a specified amount.
     * @param {number} amount - The amount to increase the value by.
     */
    increase(amount) {
        this.value += amount;
    }

    /**
     * @method decrease
     * @description Decreases the value of the status counter by a specified amount.
     * @param {number} amount - The amount to decrease the value by.
     */
    decrease(amount) {
        this.value -= amount;
    }
}