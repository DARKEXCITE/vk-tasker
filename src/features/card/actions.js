import * as actionType from "./types"

export const setCard = ({ id, name, text }) => ({ type: actionType.SET_CARD, id, text, name })
