import * as actionType from '../types'

const initialState = {
    popout: null
}

export default (state = initialState, action) => {
    switch (action.type) {
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
