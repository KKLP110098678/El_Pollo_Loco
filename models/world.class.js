class World {
    character = new Character();

    chicken = level1.chicken;
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;
    throwableObjects = [];

    sky = new Sky();

    canvas;
    ctx;
    keyboard;
    camera_x = -100;

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.level = level1;
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectToMap(this.sky);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.chicken);
        this.addObjectsToMap(this.clouds);
        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(() => this.draw());
    }

    addObjectToMap(object) {
        if (object.otherDirection) {
            this.ctx.save();
            this.ctx.translate(object.x + object.width / 2, 0);
            this.ctx.scale(-1, 1);
            this.ctx.translate(-object.x - object.width / 2, 0);
        }
        this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
        this.ctx.beginPath();
        this.ctx.lineWidth = '5';
        this.ctx.strokeStyle = 'red';
        this.ctx.rect(object.x, object.y, object.width, object.height);
        this.ctx.stroke();
        if (object.otherDirection) {
            this.ctx.restore();
        }
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addObjectToMap(object);
        });
    }
}