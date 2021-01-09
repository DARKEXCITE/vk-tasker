import React  from "react"
import PropTypes from "prop-types"
import { Card, Div } from "@vkontakte/vkui"
import { useDispatch } from "react-redux"

import { deleteCard } from "../../actions"
import { removeCard } from "../../redux/actions"
import './ColumnCard.css'

const ColumnCard = ({ children, id }) => {
    const dispatch = useDispatch()

    // Удаление карточки
    const deleteItem = () => {
        deleteCard(id)
            .then(() => dispatch(removeCard(id)))
            .catch(console.error)
    }

    return (
        <Card size="l">
            <Div className="ColumnCard__wrapper">
                <div onClick={deleteItem}>{children}</div>
            </Div>
        </Card>
    )
}

ColumnCard.propTypes = {
    children: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
}

export default ColumnCard
