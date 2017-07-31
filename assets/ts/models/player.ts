export enum PlayerNumber {
    One,
    Two
}

export default class Player {
    name: string
    mark: string
    number: PlayerNumber

    constructor(num: PlayerNumber) {
        if (num === PlayerNumber.One) {
            this.name = 'Player One'
            this.mark = 'X'
            this.number = num
        } else {
            this.name = 'Player Two'
            this.mark = 'O'
            this.number = num
        }
    }
}
