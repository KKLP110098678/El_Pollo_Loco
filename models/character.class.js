class Character extends MovableObject {
    constructor() {
        super();
        this.x = 120;
        this.y = 270;
        this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.width = 50;
        this.height = 150;
    }

        moveRight() {
        this.x += 50;
    }


}