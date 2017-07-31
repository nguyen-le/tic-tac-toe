import {Component} from 'react'
import GameStore from '../store/game-store'
import GameService from '../service/game-service'
import Player, {PlayerNumber} from '../models/player'
import Row from './row'


interface GameState {
    currentPlayer: Player
}

export default class Game extends Component<{}, GameState> {
    private unsubscribe

    constructor() {
        super()

        GameStore.init()
        this.state = {
            currentPlayer: GameStore.getCurrentPlayer()
        }

        this.restart = this.restart.bind(this)
    }

    componentWillMount() {
        this.unsubscribe = GameStore.subscribe(() => {
            this.setState({
                currentPlayer: GameStore.getCurrentPlayer()
            })
        })
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    generateRows() {
        const boardSize = GameStore.getBoardSize()
        let rows = []
        for (let i = 0; i < boardSize; i++) {
            rows.push(<Row rowNum={i} last={i + 1 === boardSize}/>)
        }
        return rows
    }

    restart() {
        GameStore.init()
    }

    render() {
        let {currentPlayer} = this.state
        let {gameOver, winningPlayer} = GameService.isGameOver()
        let playerMessage = ''

        if (gameOver) {
            playerMessage = winningPlayer ? `${winningPlayer.name} wins!` : 'Stalemate!'
        } else {
            playerMessage = `${currentPlayer.name}'s turn: Place an ${currentPlayer.mark}`
        }

        return <div>
            {playerMessage}
            {this.generateRows()}

            {gameOver ? <button onClick={this.restart}>Click to restart</button>
                : null}
        </div>
    }
}

