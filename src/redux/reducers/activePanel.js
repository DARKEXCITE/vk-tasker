import * as actionType from '../types'

const initialState = {
    activePanel: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        // Изменить активную панель
        case actionType.SET_ACTIVE_PANEL: {
            return {
                ...state,
                activePanel: action.panel
            }
        }

        default: { return state }
    }
}
