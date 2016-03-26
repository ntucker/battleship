import { Component } from 'react'
import Block from './Block'
import Ship from './Ship'


import './Board.scss'


export default class Board extends Component {
  render() {
    const { board, ships, fire } = this.props
    if (!board) return <board/>
    return (
      <board>
        {ships && ships.map((ship, i) => <Ship {...ship} key={i} />)}
        {board.map((row, ri) => (
          <boardrow key={ri}>
            {row.map((point, ci) => <Block hit={point} onClick={fire ? () => {fire(ci,ri)} : undefined} key={`${ci},${ri}`} />)}
          </boardrow>
        ))}
      </board>
    )
  }
}