import GameStore from '../store/game-store'
import Player, {PlayerNumber} from '../models/player'


interface GameOverData {
    gameOver: boolean
    winningPlayer: Player
}

export default class GameService {
    static isGameOver(): GameOverData {
        let result = this.checkStraightWin() || this.checkDiagonalWin() || this.isStaleMate()

        if (result) {
            if (result.gameOver) {
                GameStore.endGame()
            }
            return result
        } else {
            return {
                gameOver: false,
                winningPlayer: null
            }
        }
    }

    static checkStraightWin(): GameOverData {
        let rows = GameStore.getRows()

        for (let i = 0; i < rows.length; i++) {

            let horizontalValue = null
            let horizontalWin = true

            let verticalValue = null
            let verticalWin = true

            for (let j = 0; j < rows.length; j++) {
                if (horizontalValue === null) {
                    horizontalValue = rows[i][j]
                } else if (horizontalValue !== rows[i][j]) {
                    horizontalWin = false
                }

                if (verticalValue === null) {
                    verticalValue = rows[j][i]
                } else if (verticalValue !== rows[j][i]) {
                    verticalWin = false
                }
            }

            if (horizontalValue && horizontalWin) {
                return {
                    gameOver: true,
                    winningPlayer: GameStore.getPlayerByMark(horizontalValue)
                }
            }

            if (verticalValue && verticalWin) {
                return {
                    gameOver: true,
                    winningPlayer: GameStore.getPlayerByMark(verticalValue)
                }
            }
        }

        return null
    }

    static checkDiagonalWin(): GameOverData {
        let rows = GameStore.getRows()

        let diagTopLeftBotRightValue = null
        let diagTopLeftBotRightWin = true

        let diagBotLeftTopRightValue = null
        let diagBotLeftTopRightWin = true

        for (let r = 0; r < rows.length; r++) {

            if (diagTopLeftBotRightValue === null) {
                diagTopLeftBotRightValue = rows[r][r]
            } else if (diagTopLeftBotRightValue !== rows[r][r]) {
                diagTopLeftBotRightWin = false
            }

            if (diagBotLeftTopRightValue === null) {
                diagBotLeftTopRightValue = rows[rows.length - 1 - r][r]
            } else if (diagBotLeftTopRightValue !== rows[rows.length - 1 - r][r]) {
                diagBotLeftTopRightWin = false
            }
        }

        if (diagTopLeftBotRightValue && diagTopLeftBotRightWin) {
            return {
                gameOver: true,
                winningPlayer: GameStore.getPlayerByMark(diagTopLeftBotRightValue)
            }
        }

        if (diagBotLeftTopRightValue && diagBotLeftTopRightWin) {
            return {
                gameOver: true,
                winningPlayer: GameStore.getPlayerByMark(diagBotLeftTopRightValue)
            }
        }

        return null
    }

    static isStaleMate(): GameOverData {
        let rows = GameStore.getRows()
        let gameOver = true

        for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < rows.length; j++) {
                if (!rows[i][j]) {
                    gameOver = false
                }
            }
        }

        return {
            gameOver: gameOver,
            winningPlayer: null
        }
    }

    static switchCurrentPlayer() {
        if (GameStore.getCurrentPlayer().number === PlayerNumber.One) {
            GameStore.setCurrentPlayer(GameStore.getPlayerByNumber(PlayerNumber.Two))
        } else {
            GameStore.setCurrentPlayer(GameStore.getPlayerByNumber(PlayerNumber.One))
        }
    }
}
