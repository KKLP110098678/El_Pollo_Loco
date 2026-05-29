class Npc extends Creature {
    
    constructor() {
        super();
        this.isWalking = false;
        this.detectionRange = 150; // Range within which the NPC detects the character
        this.world = null;
    }

    walkRandomly() {
        setInterval(() => {
            let randomDirection = Math.random() < 0.5 ? 'LEFT' : 'RIGHT';
            let randomSteps = Math.floor(Math.random() * 20) + 10; // Random steps between 10 and 60
            if (randomDirection === 'LEFT') {
                for (let i = 0; i < randomSteps; i++) {
                    setTimeout(() => {
                        this.moveLeft(3);
                    }, i * 100);
                }
            } else {
                for (let i = 0; i < randomSteps; i++) {
                    setTimeout(() => {
                        this.moveRight(3);
                    }, i * 100);
                }
            }
            this.isWalking = true;
            setTimeout(() => {
                this.isWalking = false;
            }, randomSteps * 100);
        }, 1000 * 5); // Change direction every 5 seconds
    }

    walkTowardsCharacter(character) {
        setInterval(() => {
            if (character.x < this.x) {
                this.moveLeft(1);
            } else if (character.x > this.x) {
                this.moveRight(1);
            }
        }, 1000 / 5);

    }

    detectCharacter(character) {
        setInterval(() => {
        let distanceX = Math.abs(this.x - character.x);
        let distanceY = Math.abs(this.y - character.y);
        let isDetected = distanceX < this.detectionRange && distanceY < this.detectionRange;
        if (isDetected) {
            this.walkTowardsCharacter(character);
        }
        return isDetected;
    }, 1000 / 10);
    }
}