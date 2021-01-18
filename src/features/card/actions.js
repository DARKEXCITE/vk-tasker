import * as actionType from "./types"

export const setCard = ({ id, name, text }) => ({ type: actionType.SET_CARD, id, text, name })
export const changeCard = (id, data) => ({ type: actionType.EDIT_CARD, id, data })
export const removeCard = () => ({ type: actionType.REMOVE_CARD })
