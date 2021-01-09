import { combineReducers } from 'redux'

import cards from './cards'
import columns from './columns'
import desks from './desks'
import popout from './popout'
import activePanel from './activePanel'

const createRootReducer = () =>
    combineReducers({
        cards,
        columns,
        desks,
        popout,
        activePanel
    })

export default createRootReducer
