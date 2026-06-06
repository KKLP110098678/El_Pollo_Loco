class StatusBar extends MovableObject {
    constructor(y, iconImage, percentageBar) {
        super();
        this.x = 20;
        this.y = y;
        this.width = 200;
        this.height = 60;
        this.percentage = 100;
        this.loadImage('img/7_statusbars/4_bar_elements/statusbar_empty.png');
        this.iconInfo = new Image();
        this.iconInfo.src = iconImage;
        this.percentageBar = new Image();
        this.percentageBar.src = percentageBar;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
    }
}
