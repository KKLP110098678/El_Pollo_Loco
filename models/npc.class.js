class Npc extends Creature {
    
    constructor() {
        super();
        this.direction = this.randomizeDirection();
        this.havingABreak = this.ramdomizePause();
        this.isWalking = false;
        this.detectionRange = 140; // Range within which the NPC detects the character
        this.world = null;
    }
    
    randomizeDirection() {
        setInterval(() => {
            let randomDirection = Math.random() < 0.5 ? 'LEFT' : 'RIGHT';
            this.direction = randomDirection;
        }, 1000);
    }

    ramdomizePause() {
        setInterval(() => {
            let havingABreak = Math.random() < 0.5 ? true : false;
            this.havingABreak = havingABreak;
            this.isWalking = !havingABreak;
        }, 1000);
    }

    choseBehavior(character, isDetected) {
        if (isDetected) {
            this.walkTowardsCharacter(character);
        }
        else if (this.havingABreak) {
            this.isWalking = false;
        }
        else {
            this.walkRandomly();
        }
    }
    walkRandomly() {
            let randomSteps = Math.floor(Math.random() * 20) + 10; // Random steps between 10 and 60
            if (this.direction === 'LEFT') {
                for (let i = 0; i < randomSteps; i++) {
                        this.moveLeft(1);
                        this.isWalking = true;

                }
            } else {
                for (let i = 0; i < randomSteps; i++) {
                        this.moveRight(1);
                        this.isWalking = true;
                }
            }
            setTimeout(() => {
                this.isWalking = false;
            }, randomSteps * 100); // Stop walking after the random steps are completed

    }

    walkTowardsCharacter(character) {
            if (character.x < this.x) {
                this.moveLeft(1);
                this.isWalking = true;
            } else if (character.x > this.x) {
                this.moveRight(1);
                this.isWalking = true;
            }
    }

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