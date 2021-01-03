import { useState } from "react"
import { panel } from "./constants"

const useDesksState = () => {
    const [desks, setDesks] = useState([])

    // Добавление доски в состояние
    const addDesk = (desk) => setDesks([...desks, desk])
    // Удаление доски из состояния
    const removeDesk = (removeId) => setDesks(desks.filter(({ id }) => removeId !== id))

    return { desks, setDesks, addDesk, removeDesk }
}

const useNavState = () => {
    const [activePanel, setActivePanel] = useState('desks')
    const [deskName, setDeskName] = useState('')
    const [deskId, setDeskId] = useState('')

    // Переход к панели с колонками доски
    const goToColumns = (name, id) => {
        setActivePanel(panel.columns)
        setDeskName(name)
        setDeskId(id)
    }

    // Переход к панели с досками
    const goToDesks = () => setActivePanel(panel.desks)

    return { activePanel, deskName, deskId, goToDesks, goToColumns }
}

const useColumnsState = () => {
    const [columns, setColumns] = useState([])

    // Добавление колонки в состояние
    const addColumn = (column) => setColumns([...columns, column])
    // Удаление колонки из состояния
    const removeColumn = (removeId) => setColumns(columns.filter(({ id }) => removeId !== id))

    return { addColumn, removeColumn, columns, setColumns }
}

const useCardsState = () => {
    const [cards, setCards] = useState([])
    // Добавление карточки в состояние
    const addCard = (card) => setCards([...cards, card])
    // Удаление карточки из состояния
    const removeCard = (removeId) => setCards(cards.filter(({ id }) => removeId !== id))

    return { cards, setCards, addCard, removeCard }
}

const usePopoutState = () => {
    const [popout, setPopout] = useState(null)

    return { popout, setPopout }
}

export const useAppState = () => {
    const navState = useNavState()
    const desksState = useDesksState()
    const columnsState = useColumnsState()
    const cardsState = useCardsState()
    const popoutState = usePopoutState()

    return {
        ...navState,
        ...desksState,
        ...columnsState,
        ...cardsState,
        ...popoutState
    }
}
