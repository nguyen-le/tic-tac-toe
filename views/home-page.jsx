const React = require('react')
const TicTacToe = require('./components/tic-tac-toe')

class HomePage extends React.Component {
    render() {
        return <div>
            ReactComponents
            <TicTacToe />
        </div>
    }
}

module.exports = HomePage

