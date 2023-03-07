class User {
    constructor(coins, power, selected=null) {
        this.coins = coins;
        this.selected = selected;
        this.power = power
        this.powerUpPrice = 10;
    }
    
    upgradePower() {
        this.power *= 2;
        this.powerUpPrice *= 2;
    }
}

class Throwable {
    constructor(name, durability, unlockPrice, coinsDropped, image, unlocked=false) {
        this.name = name;
        this.durability = durability;
        this.unlockPrice = unlockPrice;
        this.coinsDropped = coinsDropped;
        this.image = image;
        this.unlocked = unlocked;
    } 
}

