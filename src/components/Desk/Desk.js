import React from "react"
import PropTypes from 'prop-types'
import { useRouter } from 'react-router5'
import { Card, Div, Button } from "@vkontakte/vkui"
import { useDispatch } from "react-redux"

import './Desk.css'
import { deleteDesk } from "../../actions"
import { pages } from "../../config/router"
import { removeDesk } from "../../redux/actions"

const Desk = ({ id, children }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const goToColumnPanel = () => router.navigate(pages.COLUMNS, { deskId: id })

    // Удаление доски
    const deleteItem = (e) => {
        e.stopPropagation()

        deleteDesk(id)
            .then(() => dispatch(removeDesk(id)))
            .catch(console.error)
    }

    return (
        <Card size="l" onClick={goToColumnPanel}>
            <Div className="Desk__content">
                { children }
                <Button mode="destructive" onClick={deleteItem}>Удалить</Button>
            </Div>
        </Card>
    )
}

Desk.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired
}

export default Desk
