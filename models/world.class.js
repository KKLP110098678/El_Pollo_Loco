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
    throwableObjects = [];

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
        this.ctx.translate(-this.camera_x, 0);
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
        this.createRect(object, object.height, 'red');
        if (object.hitboxHeight) {
            this.createRect(object, object.hitboxHeight);
        }
        if (object.detectionRange) {
            this.createDetectionRange(object);
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
            if (this.character.isColliding(chicken) && !chicken.isDead()) {
                this.character.hit();
            }
        });
        this.throwableObjects.forEach(bottle => {
            this.chicken.forEach(chicken => {
                if (bottle.isColliding(chicken) && !chicken.isDead()) {
                    chicken.hit();
                    bottle.explode();
                }
            });
        });
        let onGround = false;
        this.groundObjects.forEach(ground => {
            if (this.character.isColliding(ground)) {
                this.character.currentFallingY = ground.y - this.character.height;
                onGround = true;
            }
        });
        
        if (!onGround) {
            this.character.currentFallingY = 270;
        }
    }, 1000 / 60);
    }
}