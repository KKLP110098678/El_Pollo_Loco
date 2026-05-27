class World {
    character = new Character();

    chicken = level1.chicken;
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;

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
        this.ctx.drawImage(this.sky.img, this.sky.x, this.sky.y, this.sky.width, this.sky.height);
        this.backgroundObjects.forEach(backgroundObject => {
            this.ctx.drawImage(backgroundObject.img, backgroundObject.x, backgroundObject.y, backgroundObject.width, backgroundObject.height);
        });
        if (this.character.otherDirection) {
            this.ctx.save();
            this.ctx.translate(this.character.x + this.character.width / 2, 0);
            this.ctx.scale(-1, 1);
            this.ctx.translate(-this.character.x - this.character.width / 2, 0);
        }
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        if (this.character.otherDirection) {
            this.ctx.restore();
        }
        this.chicken.forEach(chicken => {
            this.ctx.drawImage(chicken.img, chicken.x, chicken.y, chicken.width, chicken.height);
        });
        this.clouds.forEach(cloud => {
            this.ctx.drawImage(cloud.img, cloud.x, cloud.y, cloud.width, cloud.height);
        });
        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(() => this.draw());
    }
}