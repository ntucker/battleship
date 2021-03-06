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
  componentDidMount() {
    this.props.init()
  }
  render() {
    return (
      <app>
        <BattleShipGame/>
        <button onClick={()=>this.props.init()}>New Game</button>
      </app>
    )
  }
}