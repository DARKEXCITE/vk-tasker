import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './reducers'

const middleware = (store) => (next) => (action) => {
    return next(action)
}
const composeFunc = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose
const composedEnhancers = composeFunc(applyMiddleware(thunk, middleware))

const store = createStore(rootReducer(), composedEnhancers)

export default store
