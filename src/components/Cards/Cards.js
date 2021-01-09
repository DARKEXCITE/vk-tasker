import React, { Fragment, useEffect } from 'react'
import { CardGrid, Div } from "@vkontakte/vkui"
import { useDispatch, useSelector } from "react-redux"
import PropTypes from 'prop-types'

import ColumnCard from "../ColumnCard/ColumnCard"
import CreateForm from "../CreateForm/CreateForm"
import { createCard, getCards } from "../../actions"
import { addCard, setCards } from "../../redux/actions"
import './Cards.css'

const Cards = ({ columnId }) => {
    const dispatch = useDispatch()

    const { cards } = useSelector(s => s.cards)

    // Получаем карточки текущей колонки из БД
    useEffect(() => {
        getCards(columnId)
            .then((cards) => dispatch(setCards(cards)))
    }, [dispatch, columnId])

    // Создание новой карточки
    const createItem = (name) => {
        return createCard(name, columnId)
            .then((doc) => dispatch(addCard({id: doc.id, ...doc.data()})))
    }

    return (
        <Fragment>
            <CardGrid>
                {cards.map(({ id, name }) => <ColumnCard key={id} id={id}>{name}</ColumnCard>)}
            </CardGrid>

            {/* Форма добавления новой карточки */}
            <Div className="Card__create-button">
                <CreateForm onSubmit={createItem} placeholder="Введите название карточки" actionTitle="Добавить" />
            </Div>
        </Fragment>
    )
}

Cards.propTypes = {
    columnId: PropTypes.string.isRequired
}

export default Cards
