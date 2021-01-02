import React, { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import { CardGrid } from "@vkontakte/vkui"

import ColumnCard from "../ColumnCard/ColumnCard"
import CreateForm from "../CreateForm/CreateForm"
import { createCard, getCards } from "../../actions"
import '../Column/Column.css'

const Cards = ({ columnId }) => {
    const [cards, setCards] = useState([])

    // Получаем карточки текущей колонки из БД
    useEffect(() => {
        getCards(columnId)
            .then(setCards)
    }, [])

    // Добавление карточки в состояние
    const addCard = (card) => setCards([...cards, card])
    // Удаление карточки из состояния
    const removeCard = (removeId) => setCards(cards.filter(({ id }) => removeId !== id))

    // Создание новой карточки
    const createItem = (name) => {
        return createCard(name, columnId)
            .then((doc) => addCard({ id: doc.id, ...doc.data() }))
            .catch(console.error)
    }

    return (
        <CardGrid>
            {cards.map(({ id, name }) => <ColumnCard key={id} id={id} onDelete={removeCard}>{name}</ColumnCard>)}

            <CreateForm onSubmit={createItem} placeholder="Введите название карточки" actionTitle="Создать" />
        </CardGrid>
    )
}

Cards.propTypes = {
    columnId: PropTypes.string.isRequired
}

export default Cards
