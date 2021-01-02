import React, { useContext, useEffect } from "react"
import { Div, Button, Card, Header, CardGrid } from "@vkontakte/vkui"
import PropTypes from 'prop-types'

import Context from "../App/context"
import CreateForm from "../CreateForm/CreateForm"
import ColumnCard from "../ColumnCard/ColumnCard"
import { createCard, deleteColumn, getCards } from "../../actions"
import './Column.css'

const Column = ({ name, id }) => {
    const { removeColumn, addCard, cards, setCards } = useContext(Context)

    // Получаем карточки текущей колонки из БД
    useEffect(() => {
        getCards(id)
            .then(setCards)
    }, [])

    // Удаление колонки
    const deleteItem = () => {
        deleteColumn(id)
            .then(() => removeColumn(id))
            .catch(console.error)
    }

    // Создание новой карточки
    const createItem = (name) => {
        return createCard(name, id)
            .then((doc) => addCard({id: doc.id, ...doc.data()}))
    }

    return (
        <Div className="Column">
            <Card className="Column__wrapper">
                {/* Шапка колонки с заголовком и кнопкой удаления */}
                <div className="Column__header">
                    <Header>{name}</Header>
                    <Button mode="destructive" onClick={deleteItem}>Удалить</Button>
                </div>

                {/* Вывод всех карточек */}
                <CardGrid>
                    {cards.map(({ id, name }) => <ColumnCard key={id} id={id}>{name}</ColumnCard>)}

                    <CreateForm onSubmit={createItem} placeholder="Введите название карточки" actionTitle="Создать" />
                </CardGrid>
            </Card>
        </Div>
    )
}

Column.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
}

export default Column
