import * as actionType from '../types'
import firebase from "firebase"
import { addCard, removeCard, setCards } from "../actions"

const initialState = {
    cards: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        // Добавить карточку
        case actionType.ADD_CARD: {
            const cards = [...state.cards, action.card]

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
            const cards = state.cards.filter(({ id }) => action.removeID !== id)

            return {
                ...state,
                cards
            }
        }

        default: { return state }
    }
}


// Создание новой карточки
export const createCard = (name, columnId) => {
    return (dispatch) => {
        const db = firebase.firestore()

        return db.collection("cards")
            .add({ name, columnId })
            .then((docRef) => docRef.get())
            .then((doc) => dispatch(addCard({id: doc.id, ...doc.data()})))
    }
}

// Получение карточек
export const fetchCards = (columnId) => {
    return (dispatch) => {
        const db = firebase.firestore()

        return db.collection("cards")
            .where("columnId", "==", columnId)
            .get()
            .then((querySnapshot) => {
                const cards = []

                querySnapshot.forEach((doc) => {
                    const { columnId, name } = doc.data()
                    cards.push({
                        id: doc.id,
                        columnId,
                        name
                    })
                })

                return cards
            })
            .then((cards) => dispatch(setCards(cards)))
    }
}

// Удаление карточки
export const deleteCard = (id) => {
    return (dispatch) => {
        const db = firebase.firestore()

        return db.collection("cards")
            .doc(id)
            .delete()
            .then(() => dispatch(removeCard(id)))
            .catch(console.error)
    }
}
