/**
 * @author Ramon Kunz
 * @description This class represents a level in the game, containing the main character (chicken), clouds, background objects, and the end point of the level. It serves as a container for all the elements that make up a level and allows for easy management and organization of these elements.
 */

class Level {
    chicken;
    clouds;
    backgroundObjects;
    groundObjects;
    coins;
    levelEndX;

    constructor(chicken, clouds, backgroundObjects, groundObjects, coins, levelEndX) {
        this.chicken = chicken;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.groundObjects = groundObjects;
        this.coins = coins;
        this.levelEndX = levelEndX;
    }
}    