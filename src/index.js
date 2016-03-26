import React from 'react'
import { render } from 'react-dom'
import { App } from './App'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import battleShip from './redux'

let store = createStore(battleShip, {})
if (module.hot) {
  module.hot.accept('./redux', () => {
    return store.replaceReducer(require('./redux'))
  })
}

render(<Provider store={store}><App /></Provider>, document.getElementById('root'))

