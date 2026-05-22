class Sky extends MovableObject {
    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.width = 1440;
        this.height = 480;
        this.loadImage('img/5_background/layers/air.png');
    }
}