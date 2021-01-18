import * as actionType from "./types"

export const addColumn = (column) => ({ type: actionType.ADD_COLUMN, column })
export const removeColumn = (removeID) => ({ type: actionType.REMOVE_COLUMN, removeID })
export const setColumns = (columns) => ({ type: actionType.SET_COLUMNS, columns })
export const changeColumn = (id, name) => ({ type: actionType.EDIT_COLUMN, id, name })
