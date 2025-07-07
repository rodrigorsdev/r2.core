export default class NumberUtil {
    static generateRandomNumber() {
        return Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
    }

    static generateRandomNumberArbitrary(min, max): number {
        return Math.random() * (max - min) + min;
    }

    static generateRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static convertCurrency(value:number, decimals:number){
        return Number(value.toFixed(decimals));
    }
}