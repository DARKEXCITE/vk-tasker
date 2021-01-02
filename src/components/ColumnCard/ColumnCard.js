import React from "react"
import PropTypes from "prop-types"
import { Card, Div, Button } from "@vkontakte/vkui"

import { deleteCard } from "../../actions"
import './ColumnCard.css'

const ColumnCard = ({ children, id, onDelete }) => {
    // Удаление карточки
    const deleteItem = () => {
        deleteCard(id)
            .then(() => onDelete(id))
            .catch(console.error)
    }

    return (
        <Card size="l">
            <Div className="ColumnCard__wrapper">
                <div>{children}</div>
                <Button mode="destructive" onClick={deleteItem}>Удалить</Button>
            </Div>
        </Card>
    )
}

ColumnCard.propTypes = {
    children: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default ColumnCard
