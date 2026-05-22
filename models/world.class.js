class World {
    character = new Character();
    chicken = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ]
    ctx;
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.draw();
    }

    draw() {
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        this.chicken.forEach(chicken => {
            this.ctx.drawImage(chicken.img, chicken.x, chicken.y, chicken.width, chicken.height);
        });
    }
}