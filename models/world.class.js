/**
 * @author Ramon Kunz
 * 
 * @description This class represents the game world, containing all game objects and handling the rendering of the game.
 * It manages the character, chickens, clouds, background objects, and throwable objects.
 * The world also handles the camera movement and the main game loop for rendering.
 */

class World {
    character = new Character();
    
    chicken = level1.chicken;
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;
    groundObjects = level1.groundObjects;    
    collectableObjects = level1.collectableObjects;
    coins = level1.coins;
    throwableObjects = [];
    
    sky = new Sky();
    
    canvas;
    ctx;
    keyboard;
    camera_x = -100;

    healthBar = new StatusBar(20, 'img/7_statusbars/3_icons/icon_health.png', 'img/7_statusbars/4_bar_elements/statusbar_green.png');
    coinCounter = new StatusCounter(60, 'img/7_statusbars/3_icons/icon_coin.png');
    ammoCounter = new StatusCounter(100, 'img/7_statusbars/3_icons/icon_salsa_bottle.png');
    

    move_left_button = new MobileButton('move_left', 'img/11_mobile_controls/left_arrow.png', 580, 400);
    move_right_button = new MobileButton('move_right', 'img/11_mobile_controls/right_arrow.png', 650, 400);
    jump_button = new MobileButton('jump', 'img/11_mobile_controls/jump_arrow.png', 20, 400);
    throw_bottle_button = new MobileButton('throw_bottle', 'img/11_mobile_controls/throw_bottle.png', 20, 330);

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.checkCollisions();
        this.level = level1;
    }

    /**
     * @method setWorld
     * @description Sets the world reference for the character, allowing the character to interact with the world and other objects.
     */
    setWorld() {
        this.character.world = this;
        this.chicken.forEach(npc => {
            npc.world = this;
            npc.detectCharacter(this.character);
        });
        this.move_left_button.world = this;
        this.move_right_button.world = this;
        this.jump_button.world = this;
        this.throw_bottle_button.world = this;
    }

    /**
     * @method draw
     * Main game loop for rendering the game. It clears the canvas, translates the context based on the camera position, and draws all game objects in the correct order (sky, background objects, character, throwable objects, chickens, clouds).
     * It uses requestAnimationFrame for smooth rendering.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectToMap(this.sky);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.chicken);
        this.addObjectsToMap(this.groundObjects);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.collectableObjects);
        this.ctx.translate(-this.camera_x, 0);
        if ("ontouchstart" in window) {
            this.addObjectToMap(this.move_left_button);
            this.addObjectToMap(this.move_right_button);
            this.addObjectToMap(this.jump_button);
            this.addObjectToMap(this.throw_bottle_button);
        }
        
        // Berechne Prozentwert für das Leben (max 5)
        this.healthBar.setPercentage((this.character.life / 5) * 100);
        this.addObjectToMap(this.healthBar);
        this.coinCounter.value = this.character.coins;
        this.addObjectToMap(this.coinCounter);
        this.ammoCounter.value = this.character.ammo;
        this.addObjectToMap(this.ammoCounter);
        
        requestAnimationFrame(() => this.draw());
    }

    /**
     * @method addObjectToMap
     * Adds a single object to the map, handling its rendering and any transformations (e.g., flipping for direction).
     * @param {MovableObject} object - The object to be added to the map.
     */
    addObjectToMap(object) {
        if (object.otherDirection) {
            this.ctx.save();
            this.ctx.translate(object.x + object.width / 2, 0);
            this.ctx.scale(-1, 1);
            this.ctx.translate(-object.x - object.width / 2, 0);
        }
        this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
        
        if (object instanceof StatusBar) {
            // Zeichne den gefüllten farbigen Balken als zweite Ebene basierend auf percentage
            if (object.percentageBar && object.percentageBar.complete) {
                let ratio = Math.max(0, Math.min(1, object.percentage / 100));
                let sWidth = object.percentageBar.width * ratio;
                let dWidth = object.width * ratio;
                if (sWidth > 0 && dWidth > 0) {
                    this.ctx.drawImage(
                        object.percentageBar,
                        0, 0, sWidth, object.percentageBar.height,
                        object.x, object.y, dWidth, object.height
                    );
                }
            }

            if (object.iconInfo) {
                // Zeichne das Icon leicht versetzt über der Statusbar
                this.ctx.drawImage(object.iconInfo, object.x - 15, object.y , 50, 50);
            }
        }

        if (object instanceof StatusCounter) {
            this.ctx.font = "20px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.fillText(object.value, object.x + 60, object.y + 30);
        }
            

        if (object instanceof Character || object instanceof Chicken) {
        this.createRect(object, object.height, 'red');
            if (object.hitboxHeight) {
                this.createRect(object, object.hitboxHeight);
            }
            if (object.detectionRange) {
                this.createDetectionRange(object);
            }
        }
        if (object.otherDirection) {
            this.ctx.restore();
        }
    }
    
    createRect(object, height, color) {
        this.ctx.beginPath();
        this.ctx.lineWidth = '2';
        this.ctx.strokeStyle = color || 'blue';
        this.ctx.rect(object.x, object.y + (object.height - height), object.width, height);
        this.ctx.stroke();
    }

    createDetectionRange(object) {
        this.ctx.beginPath();
        this.ctx.lineWidth = '2';
        this.ctx.strokeStyle = 'green';
        this.ctx.beginPath();
        this.ctx.arc(object.x + object.width / 2, object.y + object.height / 2, object.detectionRange, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    /**
     * @method addObjectsToMap
     * @description Adds multiple objects to the map by iterating over the array and adding each object individually.
     * @param {MovableObject[]} objects - The array of objects to be added to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addObjectToMap(object);
        });
    }

    /**
     * @method checkCollisions
     * @description Checks for collisions between the main character and chickens, as well as between throwable objects and chickens. If a collision is detected, the appropriate hit or explode methods are called on the involved objects.
     */
    checkCollisions() {
        setInterval(() => {
        this.chicken.forEach(chicken => {
            if (this.character.isColliding(chicken) && !chicken.isDead) {
                this.character.hit();
            }
        });
        this.throwableObjects.forEach(bottle => {
            this.chicken.forEach(chicken => {
                if (bottle.isColliding(chicken) && !chicken.isDead) {
                    chicken.hit();
                    bottle.explode();
                }
            });
        });
        let onGround = false;
        this.groundObjects.forEach(ground => {
            if (this.character.isColliding(ground) && this.character.y + this.character.height <= ground.y + 10) {
                this.character.currentFallingY = ground.y - this.character.height;
                onGround = true;
            }
        });

        this.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.coins += 1;
                this.coinCounter.increase(1);
                this.coins.splice(index, 1);
            }
        });
        
        if (!onGround) {
            this.character.currentFallingY = 270;
        }
    }, 1000 / 60);
    }
}