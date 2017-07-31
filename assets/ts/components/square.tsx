import {Component} from 'react'
import GameService from '../service/game-service'
import GameStore from '../store/game-store'


interface SquareProps {
    rowNum: number,
    colNum: number,
    mark: string
    last?: boolean
}

export default class Square extends Component<SquareProps, any>{
    constructor() {
        super()
        this.onClick = this.onClick.bind(this)
    }

    onClick() {
        const {rowNum, colNum, mark} = this.props
        if (!mark) {
            GameStore.setMarkAtPosition(rowNum, colNum, GameStore.getCurrentPlayer().mark)
            GameService.switchCurrentPlayer()
        }
    }

    render() {
        let style = {
            display: 'inline-block',
            borderRight: this.props.last ? '' : '1px solid #000000',
            width: '32%',
            height: '35px',
            textAlign: 'center',
            fontSize: '43px'

        }
        return <div style={style} onClick={this.onClick}>
            {this.props.mark}
        </div>
    }
}
