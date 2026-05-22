class Chicken extends MovableObject {
    constructor() {
        super();
        this.x = 140 + Math.random() * 200;
        this.y = 370;
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.width = 50;
        this.height = 50;
    }
}   