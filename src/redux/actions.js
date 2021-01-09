import * as actionType from './types'

// Колонки
export const addColumn = (column) => ({ type: actionType.ADD_COLUMN, column })
export const removeColumn = (removeID) => ({ type: actionType.REMOVE_COLUMN, removeID })
export const setColumns = (columns) => ({ type: actionType.SET_COLUMNS, columns })

// Доски
export const addDesk = (desk) => ({ type: actionType.ADD_DESK, desk })
export const removeDesk = (removeID) => ({ type: actionType.REMOVE_DESK, removeID })
export const setDesks = (desks) => ({ type: actionType.SET_DESKS, desks })

// Активная панель
export const setActivePanel = (panel) => ({ type: actionType.SET_ACTIVE_PANEL, panel })
export const changeRoute = ({ route }) => setActivePanel(route.name)

// Карточки
export const addCard = (card) => ({ type: actionType.ADD_CARD, card })
export const removeCard = (removeID) => ({ type: actionType.REMOVE_CARD, removeID })
export const setCards = (cards) => ({ type: actionType.SET_CARDS, cards })

// Всплывающее меню
export const setPopout = (popout) => ({ type: actionType.SET_POPOUT, popout })
