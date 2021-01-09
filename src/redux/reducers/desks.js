import * as actionType from '../types'

const initialState = {
    desks: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        // Добавить доску
        case actionType.ADD_DESK: {
            const desks = [...state.desks, action.desk]

            return {
                ...state,
                desks
            }
        }

        // Изменить доски
        case actionType.SET_DESKS: {
            return {
                ...state,
                desks: action.desks
            }
        }

        // Удалить доску
        case actionType.REMOVE_DESK: {
            const desks = state.desks.filter(({ id }) => action.removeID !== id)

            return {
                ...state,
                desks
            }
        }

        default: { return state }
    }
}
