let startValue = 50;

function Monster(name, monsterType) {
    this.name = name;
    this.monsterType = monsterType;
    this.energy = startValue;
    this.happiness = startValue;
    this.fullness = startValue;

    
    this.feed = function () {
        this.fullness += 10; 
        console.log(`${this.name} is eating, food stat is now: ${this.fullness}`);
    };

    this.rest = function () {
        this.energy += 10; 
        console.log(`${this.name} is sleeping, energy is now: ${this.energy}`);
    };

    this.playWith = function () {
        this.happiness += 10; 
        console.log(`${this.name} is playing, happiness is now: ${this.happiness}`);
    };
}

const monster = new Monster("Kalle", "Troll");

monster.feed();     
monster.rest();     
monster.playWith(); 
