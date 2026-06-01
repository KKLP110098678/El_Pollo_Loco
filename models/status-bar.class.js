class StatusBar {
    images = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png'
    ]

    constructor(y) {
        this.x = 20;
        this.y = y;
        this.width = 200;
        this.height = 60;
        this.percentage = 100;
        this.loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png');
    }
}
