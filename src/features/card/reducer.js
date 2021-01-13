import firebase from "firebase"

import * as actionType from "./types"
import { setCard } from "./actions"

const initialState = {
    id: null,
    name: null,
    text: null
}

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
