import * as actionType from "./types"

export const addDesk = (desk) => ({ type: actionType.ADD_DESK, desk })
export const removeDesk = (removeID) => ({ type: actionType.REMOVE_DESK, removeID })
export const setDesks = (desks) => ({ type: actionType.SET_DESKS, desks })
export const changeDesk = (id, name) => ({ type: actionType.EDIT_DESK, id, name })
