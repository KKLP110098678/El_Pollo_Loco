class World {
    character = new Character();
    chicken = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ]

    clouds = [
        new Cloud(),
        new Cloud(),
        new Cloud()
    ]

    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0, 0, 720, 480),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0, 0, 720, 480),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720, 0, 720, 480),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720, 0, 720, 480)
    ];

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
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
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