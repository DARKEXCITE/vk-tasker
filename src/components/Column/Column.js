import React, { useContext } from "react"
import { Div, Button, Card, Header } from "@vkontakte/vkui"
import PropTypes from 'prop-types'

import Cards from "../Cards/Cards"
import Context from "../App/context"
import { deleteColumn } from "../../actions"
import './Column.css'

const Column = ({ name, id }) => {
    const { removeColumn } = useContext(Context)

    // Удаление колонки
    const deleteItem = () => {
        deleteColumn(id)
            .then(() => removeColumn(id))
            .catch(console.error)
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
                <Cards columnId={id} />
            </Card>
        </Div>
    )
}

Column.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
}

export default Column
