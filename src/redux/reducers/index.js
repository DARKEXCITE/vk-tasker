import { combineReducers } from 'redux'

import app from './app'
import cards from '../../features/cards/reducer'
import columns from '../../features/columns/reducer'
import desks from '../../features/desks/reducer'

const createRootReducer = () =>
    combineReducers({
        app,
        cards,
        columns,
        desks,
    })

export default createRootReducer
