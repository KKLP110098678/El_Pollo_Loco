class MobileButton extends MovableObject {
    constructor(id, img, x, y) {
        super();
        this.id = id;
        this.activeTouchId = null;
        this.loadImage(img);
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.addTouchListener();
    }

    addTouchListener() {
        document.addEventListener('touchstart', this.documentTouchStartHandler.bind(this), { passive: false });
        document.addEventListener('touchend', this.documentTouchEndHandler.bind(this), { passive: false });
        document.addEventListener('touchcancel', this.documentTouchEndHandler.bind(this), { passive: false });
    }

    getCanvasCoordinates(touch) {
        let canvas = document.getElementById('gameCanvas');
        if (!canvas) return { touchX: 0, touchY: 0 };
        let rect = canvas.getBoundingClientRect();
        let scaleX = canvas.width / rect.width;
        let scaleY = canvas.height / rect.height;
        let touchX = (touch.clientX - rect.left) * scaleX;
        let touchY = (touch.clientY - rect.top) * scaleY;
        return { touchX, touchY };
    }

    documentTouchStartHandler(event) {
        for (let i = 0; i < event.changedTouches.length; i++) {
            let touch = event.changedTouches[i];
            let coords = this.getCanvasCoordinates(touch);
            if (this.isTouchInsideButton(coords.touchX, coords.touchY)) {
                this.activeTouchId = touch.identifier;
                this.handleButtonPress(true);
            }
        }
    }

    documentTouchEndHandler(event) {
        for (let i = 0; i < event.changedTouches.length; i++) {
            let touch = event.changedTouches[i];
            if (touch.identifier === this.activeTouchId) {
                this.activeTouchId = null;
                this.handleButtonPress(false);
            }
        }
    }

    isTouchInsideButton(touchX, touchY) {
        return (
            touchX >= this.x &&
            touchX <= this.x + this.width &&
            touchY >= this.y &&
            touchY <= this.y + this.height
        );
    }

    handleButtonPress(isPressed) {
        switch (this.id) {
            case 'move_left':
                this.world.keyboard.LEFT = isPressed;
                break;
            case 'move_right':
                this.world.keyboard.RIGHT = isPressed;
                break;
            case 'jump':
                this.world.keyboard.SPACE = isPressed;
                break;
            case 'throw_bottle':
                this.world.keyboard.F = isPressed;
                if (isPressed) {
                    this.world.character.throwBottle();
                }
                break;
        }
    }

}