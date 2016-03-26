import React, { Component } from 'react'
import { connect } from 'react-redux'
import { init } from './redux/ships'
import BattleShipGame from './containers/BattleShipGame'

import './App.scss'

@connect(
  undefined,
  {init},
)
export class App extends Component {
  constructor() {
    super()
    init()
  }
  render() {
    return (
      <div>
        <BattleShipGame/>
        <button onClick={()=>this.props.init()}>New Game</button>
      </div>
    )
  }
}