import Player, {PlayerNumber} from '../models/player'
import Store from './store'


export class GameStore extends Store {
    private currentPlayer: Player
    private ended: boolean
    private players: Player[] = []
    private rows: string[][]

    getBoardSize(): number {
        return this.rows.length
    }

    setCurrentPlayer(player: Player) {
        this.currentPlayer = player
        this.emit()
    }

    getCurrentPlayer(): Player {
        return this.currentPlayer
    }

    setMarkAtPosition(rowNumber: number, columnNumber: number, mark: string) {
        if (this.ended) {
            return
        }
        this.rows[rowNumber][columnNumber] = mark
        this.emit()
    }

    getMarkAtPosition(rowNumber: number, columnNumber: number): string {
        return this.rows[rowNumber][columnNumber]
    }

    getRows() {
        return this.rows
    }

    addPlayer(player: Player) {
        this.players.push(player)
    }

    getPlayerByNumber(n: PlayerNumber) {
        return this.players.filter((player) => player.number === n)[0]
    }

    getPlayerByMark(mark: string) {
        return this.players.filter((player) => player.mark === mark)[0]
    }

    init() {
        let playerOne = new Player(PlayerNumber.One)
        let playerTwo = new Player(PlayerNumber.Two)

        this.ended = false
        this.setupBoard()
        this.addPlayer(playerOne)
        this.addPlayer(playerTwo)
        this.setCurrentPlayer(playerOne)
        this.emit()
    }

    endGame() {
        this.ended = true
    }

    setupBoard() {
        this.rows = [
            [],
            [],
            []
        ]
    }
}

export default new GameStore()
