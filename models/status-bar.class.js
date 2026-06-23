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

    /**
     * @method setPercentage
     * @description Sets the percentage value for the status bar. This value is used to determine how much of the bar is filled based on the current state of the game (e.g., health, ammo).
     * @param {number} percentage - The new percentage value to set for the status bar.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
    }
}
