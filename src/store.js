import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { merge } from 'ramda'
import logo from './logo.gif'
import { map, addIndex } from 'ramda'

const mapIndexed = addIndex(map)

const store = createStore(
  combineReducers({
    app,
    squares: squares,
    xIsNext: xIsNext
  }),
  applyMiddleware(thunk)
)

export default store

// reducers
function xIsNext(state = true, action) {
  switch (action.type) {
    case 'SET_X_IS_NEXT':
      return action.payload
    default:
      return state
  }
}

function squares(state = Array(9).fill(null), action) {
  switch (action.type) {
    case 'SET_SQUARE':
      return mapIndexed((square, index) => {
        return action.payload.index === index ? action.payload.value : square
      }, state)
    default:
      return state
  }
}

function app(
  state = { title: 'JRS Coding School React Starterkit', logo },
  action
) {
  switch (action.type) {
    case 'SET_APP_TITLE':
      return merge(state, { title: action.payload })
    default:
      return state
  }
}
