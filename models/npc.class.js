class Npc extends Creature {
    
    constructor() {
        super();
        this.isWalking = false;
        this.detectionRange = 200; // Range within which the NPC detects the character
    }

    walkRandomly() {
        setInterval(() => {
            let randomDirection = Math.random() < 0.5 ? 'LEFT' : 'RIGHT';
            let randomSteps = Math.floor(Math.random() * 20) + 10; // Random steps between 10 and 60
            if (randomDirection === 'LEFT') {
                for (let i = 0; i < randomSteps; i++) {
                    setTimeout(() => {
                        this.moveLeft();
                    }, i * 100);
                }
            } else {
                for (let i = 0; i < randomSteps; i++) {
                    setTimeout(() => {
                        this.moveRight();
                    }, i * 100);
                }
            }
            this.isWalking = true;
            setTimeout(() => {
                this.isWalking = false;
            }, randomSteps * 100);
        }, 1000 * 5); // Change direction every 5 seconds
    }
}