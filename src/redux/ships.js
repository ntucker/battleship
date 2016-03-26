import {createAction, handleActions, handleAction} from 'redux-actions'
import BattleShip from '../backend/battleship'

let battleship = new BattleShip()


const INIT = 'battleship/ships/INIT'
const FIRE = 'battleship/ships/FIRE'

export const init = createAction(INIT)
export const fire = createAction(FIRE, (x,y) => [x,y])

export const shipReducer = handleActions({
  [INIT]: (state, action) => {
    battleship = new BattleShip()
    return {
      ...state,
      myBoard: battleship.myBoard.boardStatus,
      enemyBoard: battleship.enemyBoard.boardStatus,
      myShips: battleship.myShips,
    }
  },
  [FIRE]: (state, action) => {
    if (state.youWin || state.youLose) return state
    let fired
    try {
      fired = battleship.fire(...action.payload)
    } catch(e) {
      return state
    }
    return {
      ...state,
      ...fired,
    }
  },
}, {})
