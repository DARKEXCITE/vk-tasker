import React  from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { Card, Div } from "@vkontakte/vkui"

import { deleteCard } from "../../redux/reducers/cards"
import './ColumnCard.css'

const ColumnCard = ({ children, id }) => {
    const dispatch = useDispatch()

    return (
        <Card size="l">
            <Div className="ColumnCard__wrapper">
                <div onClick={() => dispatch(deleteCard(id))}>{children}</div>
            </Div>
        </Card>
    )
}

ColumnCard.propTypes = {
    children: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
}

export default ColumnCard
