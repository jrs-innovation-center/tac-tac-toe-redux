import React from 'react'
import Square from '../components/square'
import { connect } from 'react-redux'
import calculateWinner from '../lib/calculate-winner'

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={this.props.handleClick(
          i,
          this.props.xIsNext,
          this.props.squares
        )}
      />
    )
  }

  render() {
    //const status = `Next player: ${this.props.xIsNext ? 'X' : 'O'}`
    const winner = calculateWinner(this.props.squares)
    let status = null
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O')
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(Board)

function mapActionsToProps(dispatch) {
  return {
    handleClick: (i, xIsNext, squares) => event => {
      if (calculateWinner(squares) || squares[i]) {
        return
      }

      dispatch({
        type: 'SET_SQUARE',
        payload: {
          index: i,
          value: xIsNext ? 'X' : 'O'
        }
      })
      dispatch({
        type: 'SET_X_IS_NEXT',
        payload: !xIsNext
      })
    }
  }
}

function mapStateToProps(state) {
  return {
    squares: state.squares,
    xIsNext: state.xIsNext
  }
}
