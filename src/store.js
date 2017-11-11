import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createBrowserHistory } from 'history'
import { routerReducer as routing, routerMiddleware } from 'react-router-redux'

import {authReducer as auth, initialize as initializeAuth } from './auth'

export const history = createBrowserHistory()

const middleware = [
  routerMiddleware(history),
  thunkMiddleware
]

const defaultState = {
  routing: {}
}



if(process.env.NODE_ENV === 'development' || (localStorage && localStorage.showLogging)) {
	const loggerMiddleware = createLogger();
	middleware.push(loggerMiddleware);
}

const rootReducer = combineReducers({
  routing,
  auth
})


const store = createStore(
  rootReducer,
  defaultState,
  applyMiddleware(...middleware)
)
initializeAuth(store, history)


export default store