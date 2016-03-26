import { Component } from 'react'
import { connect } from 'react-redux'
import { fire } from '../redux/ships'

import Board from '../components/Board'
import Messages from '../components/Messages'

@connect(
  (state, ownProps) => state,
  {fire},
)
export default class BattleShipGame extends Component {
  render() {
    const {enemyBoard, myBoard, myShips, fire, ...props} = this.props
    const gameDone = props.youWin || props.youLose
    return (
      <section>
        <Messages {...props}/>
        <h3>Enemy</h3>
        <Board board={enemyBoard} fire={gameDone ? undefined : fire} />
        <h3>You</h3>
        <Board board={myBoard} ships={myShips}/>
      </section >
    )
  }
}