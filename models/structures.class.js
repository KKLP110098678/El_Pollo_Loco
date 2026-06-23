class Structure extends MovableObject {
    constructor(id, y, x) {
        super();
        this.id = id;
        this.y = y;
        this.x = x;
    }
}

class Ground extends Structure {
    constructor(id, y, x, width, height) {
        super(id, y, x);
        this.loadImage('assets/img/10_platforms/wood-ground.png');
        this.width = width;
        this.height = height;
    }

}