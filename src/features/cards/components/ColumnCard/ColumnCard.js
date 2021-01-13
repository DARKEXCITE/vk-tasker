import React, { useCallback, memo }  from "react"
import PropTypes from "prop-types"
// import { useDispatch } from "react-redux"
import { Card, Div } from "@vkontakte/vkui"
import { useRouter } from "react-router5"

// import { deleteCard } from "../../reducer"
import { pages } from "../../../../config/router"
import "./ColumnCard.css"

const ColumnCard = ({ children, id }) => {
    // const dispatch = useDispatch()
    const router = useRouter()

    const goToCardPage = useCallback(() => router.navigate(pages.CARD, { cardId: id }), [router, id])
    // const deleteItem = () => dispatch(deleteCard(id))

    return (
        <Card size="l" onClick={goToCardPage}>
            <Div className="ColumnCard__wrapper">
                <div>{children}</div>
            </Div>
        </Card>
    )
}

ColumnCard.propTypes = {
    children: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
}

export default memo(ColumnCard)
