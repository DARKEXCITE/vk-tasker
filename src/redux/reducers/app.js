import * as actionType from '../types'

const initialState = {
    activePanel: null,
    popout: null
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

        // Показать всплывающее окно
        case actionType.SET_POPOUT: {
            return {
                ...state,
                popout: action.popout
            }
        }

        default: { return state }
    }
}
