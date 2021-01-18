import firebase from "firebase"

import * as actionType from "./types"
import { deleteCard } from "../cards/reducer"
import { changeCard, removeCard, setCard } from "./actions"

const initialState = Object.freeze({
    id: null,
    name: null,
    text: null
})

export default (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_CARD: {
            return {
                ...state,
                id: action.id,
                name: action.name,
                text: action.text
            }
        }

        // Редактировать карточку
        case actionType.EDIT_CARD: {
            return {
                ...state,
                ...action.data
            }
        }

        // Удалить карточку
        case actionType.REMOVE_CARD: { return { ...initialState }}

        default: { return state }
    }
}

export const fetchCard = (cardId) => (dispatch) => {
    const db = firebase.firestore()

    return db.collection("cards")
        .doc(cardId)
        .get()
        .then((doc) => ({
            id: doc.id,
            ...doc.data()
        }))
        .then(card => {
            dispatch({ type: actionType.FETCH_CARD_SUCCESS })
            dispatch(setCard(card))
        })
        .catch(() => dispatch({ type: actionType.FETCH_CARD_FAIL }))

}

// Редактирование карточки
export const editCard = (id, data = {}) => {
    return (dispatch) => {
        const db = firebase.firestore()

        return db.collection("cards")
            .doc(id)
            .update(data)
            .then(() => {
                dispatch({ type: actionType.EDIT_CARD_SUCCESS })
                dispatch(changeCard(id, data))
            })
            .catch(() => dispatch({ type: actionType.EDIT_CARD_FAIL }))
    }
}

// Удаление карточки
export const deleteCardItem = () => {
    return (dispatch, getState) => {
        const { card: { id }} = getState()
        return dispatch(deleteCard(id))
            .then(() => {
                dispatch({ type: actionType.REMOVE_CARD_SUCCESS })
                dispatch(removeCard())
            })
            .catch(() => dispatch({ type: actionType.REMOVE_CARD_FAIL }))
    }
}
