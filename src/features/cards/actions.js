import * as actionType from "./types"

export const addCard = (card) => ({ type: actionType.ADD_CARD, card })
export const removeCard = (removeID) => ({ type: actionType.REMOVE_CARD, removeID })
export const setCards = (cards) => ({ type: actionType.SET_CARDS, cards })
