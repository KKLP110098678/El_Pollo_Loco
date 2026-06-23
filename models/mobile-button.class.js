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

    /**
     * @method addTouchListener
     * @description Adds touch event listeners to the document for handling touch interactions with the mobile button. The listeners handle touchstart, touchend, and touchcancel events, allowing the button to respond to user input on touch devices.
     */
    addTouchListener() {
        document.addEventListener('touchstart', this.documentTouchStartHandler.bind(this), { passive: false });
        document.addEventListener('touchend', this.documentTouchEndHandler.bind(this), { passive: false });
        document.addEventListener('touchcancel', this.documentTouchEndHandler.bind(this), { passive: false });
    }

    /**
     * @method getCanvasCoordinates
     * @description Converts touch coordinates from the screen to canvas coordinates, taking into account the canvas's position and scaling. This method is used to determine if a touch event occurred within the bounds of the mobile button.
     * @param {Touch} touch - The touch event object containing the touch coordinates.
     * @returns {Object} An object containing the touch coordinates relative to the canvas (touchX, touchY).
     */
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

    /**
     * @method documentTouchStartHandler
     * @description Handles the touchstart event on the document. Checks if the touch is inside the button and updates the button's state accordingly.
     * @param {TouchEvent} event - The touchstart event object.
     */
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

    /**
     * @method documentTouchEndHandler
     * @description Handles the touchend and touchcancel events on the document. Checks if the touch that ended is the active touch for the button and updates the button's state accordingly.
     * @param {TouchEvent} event - The touchend or touchcancel event object.
     */
    documentTouchEndHandler(event) {
        for (let i = 0; i < event.changedTouches.length; i++) {
            let touch = event.changedTouches[i];
            if (touch.identifier === this.activeTouchId) {
                this.activeTouchId = null;
                this.handleButtonPress(false);
            }
        }
    }

    /**
     * @method isTouchInsideButton
     * @description Checks if the touch coordinates are inside the button's area. This method is used to determine if a touch event should trigger the button's action.
     * @param {number} touchX - The x-coordinate of the touch event relative to the canvas.
     * @param {number} touchY - The y-coordinate of the touch event relative to the canvas.
     * @returns {boolean} - Returns true if the touch is inside the button's area, false otherwise.
     */
    isTouchInsideButton(touchX, touchY) {
        return (
            touchX >= this.x &&
            touchX <= this.x + this.width &&
            touchY >= this.y &&
            touchY <= this.y + this.height
        );
    }

    /**
     * @method handleButtonPress
     * @description Handles the button press action based on the button's ID. Updates the corresponding keyboard state in the world object.
     * @param {boolean} isPressed - Indicates whether the button is pressed (true) or released (false).
     */
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