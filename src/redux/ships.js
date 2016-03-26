import {createAction, handleActions, handleAction} from 'redux-actions'
import BattleShip from '../backend/battleship'

let battleship = new BattleShip()


const INIT = 'battleship/ships/INIT'
const FIRE = 'battleship/ships/FIRE'

export const init = createAction(INIT)
export const fire = createAction(FIRE)

export const shipReducer = handleActions({
  [INIT]: (state, action) => {
    battleship = new BattleShip()
    return {
      ...state,
      myBoard: battleship.myBoard.boardStatus,
      enemyBoard: battleship.enemyBoard.boardStatus,
      ships: battleship.myShips,
    }
  },
  [FIRE]: (state, action) => {
    return {
      ...state,
      ...battleship.fire(...action.payload),
    }
  },
}, {})
