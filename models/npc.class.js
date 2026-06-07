/**
 * @author: Ramon Kunz
 * NPC (Non-Player Character) class represents characters in the game that are not controlled by the player.
 * NPCs can have different behaviors, such as walking randomly or walking towards the main character when detected.
 * They extend the Creature class, inheriting properties and methods related to health and movement.
 * The NPC class includes methods for randomizing direction and pause behavior, as well as detecting the main character and choosing behavior accordingly.
 */

class Npc extends Creature {
    
    constructor() {
        super();
        this.direction = this.randomizeDirection();
        this.havingABreak = this.ramdomizePause();
        this.isWalking = false;
        this.detectionRange = 140; // Range within which the NPC detects the character
        this.world = null;
    }
    
    /**
     * @method randomizeDirection
     * @description Randomly sets the initial direction of the NPC to either 'LEFT' or 'RIGHT'. This method uses setInterval to continuously randomize the direction at regular intervals, creating a more dynamic and unpredictable behavior for the NPC.
     */
    randomizeDirection() {
        setInterval(() => {
            let randomDirection = Math.random() < 0.5 ? 'LEFT' : 'RIGHT';
            this.direction = randomDirection;
        }, 1000);
    }

    /**
     * @method ramdomizePause
     * @description Randomly sets the NPC's pause state, determining whether it is taking a break or walking. This method uses setInterval to continuously randomize the pause state at regular intervals, creating a more dynamic and unpredictable behavior for the NPC.
     */
    ramdomizePause() {
        setInterval(() => {
            let havingABreak = Math.random() < 0.5 ? true : false;
            this.havingABreak = havingABreak;
            this.isWalking = !havingABreak;
        }, 1000);
    }

    /**
     * @method choseBehavior
     * @description Chooses the behavior of the NPC based on whether the main character is detected. If the character is detected, the NPC will walk towards the character. If the NPC is taking a break, it will stop walking. Otherwise, it will walk randomly.
     * @param {Character} character - The main character that the NPC interacts with.
     * @param {boolean} isDetected - Indicates whether the main character is detected by the NPC.
     */
    choseBehavior(character, isDetected) {
        if (this.isDead) {
            this.havingABreak = true;
        }
        else if (isDetected) {
            this.walkTowardsCharacter(character);
        }
        else if (this.havingABreak) {
            this.isWalking = false;
        }
        else {
            this.walkRandomly();
        }
    }

    /**
     * @method walkRandomly
     * @description Makes the NPC walk in a random direction for a random number of steps. The NPC's walking state is updated accordingly.
     */
    walkRandomly() {
            let randomSteps = Math.floor(Math.random() * 20) + 10; // Random steps between 10 and 60
            for (let i = 0; i < randomSteps; i++) {
                    if (this.direction === 'LEFT' && this.x > this.spawnAreaX[0]) {
                        this.moveLeft(1);
                        this.isWalking = true;

                    } else if (this.direction === 'RIGHT' && this.x < this.spawnAreaX[1]) {
                        this.moveRight(1);
                        this.isWalking = true;
                }
            }
            setTimeout(() => {
                this.isWalking = false;
            }, randomSteps * 100); // Stop walking after the random steps are completed
    }

    /**
     * @method walkTowardsCharacter
     * @description Makes the NPC walk towards the main character. The NPC's walking state is updated accordingly.
     * @param {Character} character - The main character that the NPC interacts with.
     */
    walkTowardsCharacter(character) {
            if (character.x < this.x) {
                this.moveLeft(1);
                this.isWalking = true;
            } else if (character.x > this.x) {
                this.moveRight(1);
                this.isWalking = true;
            }
    }

    /**
     * @method detectCharacter
     * @description Detects the main character within the NPC's detection range and updates the NPC's behavior accordingly.
     * @param {Character} character - The main character that the NPC interacts with.
     */
    detectCharacter(character) {
        setInterval(() => {
        let distanceX = Math.abs(this.x - character.x);
        let distanceY = Math.abs(this.y - character.y);
        let isDetected = distanceX < this.detectionRange && distanceY < this.detectionRange;
        this.choseBehavior(character, isDetected);
        return isDetected;
    }, 1000 / 10);
    }
}