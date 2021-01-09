import * as actionType from '../types'

const initialState = {
    cards: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        // Добавить карточку
        case actionType.ADD_CARD: {
            const cards = [...state.cards.cards, action.card]

            return {
                ...state,
                cards
            }
        }

        // Изменить карточки
        case actionType.SET_CARDS: {
            return {
                ...state,
                cards: action.cards
            }
        }

        // Удалить карточку
        case actionType.REMOVE_CARD: {
            const cards = state.desks.filter(({ id }) => action.removeID !== id)

            return {
                ...state,
                cards
            }
        }

        default: { return state }
    }
}
