import * as actionType from './types'

// Активная панель
export const setActivePanel = (panel) => ({ type: actionType.SET_ACTIVE_PANEL, panel })
export const changeRoute = ({ route }) => setActivePanel(route.name)
// Всплывающее меню
export const setPopout = (popout) => ({ type: actionType.SET_POPOUT, popout })
