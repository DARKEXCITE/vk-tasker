import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import app from './reducer'
import cards from '../features/cards/reducer'
import columns from '../features/columns/reducer'
import desks from '../features/desks/reducer'

const rootReducer = () =>
    combineReducers({
        app,
        cards,
        columns,
        desks,
    })

const middleware = (store) => (next) => (action) => {
    return next(action)
}
const composeFunc = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose
const composedEnhancers = composeFunc(applyMiddleware(thunk, middleware))

const store = createStore(rootReducer(), composedEnhancers)

export default store
