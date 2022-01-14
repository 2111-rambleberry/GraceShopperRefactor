import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import singleBookReducer from './singleBook'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'

const reducer = combineReducers({ auth, singleBookReducer })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
