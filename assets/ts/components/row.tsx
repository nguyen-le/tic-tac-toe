import {Component} from 'react'
import Square from './square'
import GameStore from '../store/game-store'


interface RowProps {
    rowNum: number,
    last?: boolean
}

export default class Row extends Component<RowProps, {}> {
    generateSquares() {
        const boardSize = GameStore.getBoardSize()
        let squares = []
        for (let i = 0; i < boardSize; i++) {
            squares.push(
                <Square
                    rowNum={this.props.rowNum}
                    colNum={i}
                    mark={GameStore.getMarkAtPosition(this.props.rowNum, i)}
                    last={i + 1 === boardSize}
                />
            )
        }
        return squares
    }

    render() {
        let style = {
            display: 'block',
            borderBottom: this.props.last ? '' : '1px solid #000000',
            width: '100px'
        }
        return <div style={style}>
            {this.generateSquares()}
        </div>
    }
}
