import React, { Fragment, useEffect, useCallback, memo } from 'react'
import { CardGrid, Div } from "@vkontakte/vkui"
import { useDispatch, useSelector } from "react-redux"
import PropTypes from 'prop-types'

import ColumnCard from "../ColumnCard/ColumnCard"
import CreateForm from "../../../../components/CreateForm/CreateForm"
import { getCards } from "../../selectors"
import { createCard, fetchCards } from "../../reducer"
import './Cards.css'

const Cards = ({ columnId }) => {
    const dispatch = useDispatch()
    const cards = useSelector(getCards)

    // Получаем карточки текущей колонки из БД
    useEffect(() => {
        dispatch(fetchCards(columnId))
    }, [dispatch, columnId])

    // Создание карточки
    const createItem = useCallback((name) => dispatch(createCard(name, columnId)), [dispatch, columnId])

    return (
        <Fragment>
            {/* Вывод всех карточек в колонке */}
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

export default memo(Cards)
