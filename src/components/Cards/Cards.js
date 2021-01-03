import React, { Fragment, useContext, useEffect } from 'react'
import { CardGrid, Div } from "@vkontakte/vkui"
import PropTypes from 'prop-types'

import Context from "../App/context"
import ColumnCard from "../ColumnCard/ColumnCard"
import CreateForm from "../CreateForm/CreateForm"
import {createCard, getCards} from "../../actions"
import './Cards.css'

const Cards = ({ columnId }) => {
    const { cards, addCard, setCards } = useContext(Context)

    // Получаем карточки текущей колонки из БД
    useEffect(() => {
        getCards(columnId)
            .then(setCards)
    }, [])

    // Создание новой карточки
    const createItem = (name) => {
        return createCard(name, columnId)
            .then((doc) => addCard({id: doc.id, ...doc.data()}))
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
