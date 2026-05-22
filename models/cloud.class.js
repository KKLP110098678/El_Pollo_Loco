class Cloud extends MovableObject {
    constructor() {
        super();
        this.x = 120 + Math.random() * 200;
        this.y = 50 + Math.random() * 100;
        this.loadImage('img/5_background/layers/4_clouds/1.png');
        this.width = 500;
        this.height = 250;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.x -= 0.15;
        }, 1000 / 60);
    }
}
