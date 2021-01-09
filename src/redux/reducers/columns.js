import * as actionType from '../types'

const initialState = {
    columns: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        // Добавить колонку
        case actionType.ADD_COLUMN: {
            const columns = [...state.columns, action.column]

            return {
                ...state,
                columns
            }
        }

        // Изменить колонки
        case actionType.SET_COLUMNS: {
            return {
                ...state,
                columns: action.columns
            }
        }

        // Удалить колонку
        case actionType.REMOVE_COLUMN: {
            const columns = state.columns.filter(({ id }) => action.removeID !== id)

            return {
                ...state,
                columns
            }
        }

        default: { return state }
    }
}
