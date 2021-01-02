import React, { useContext } from "react"
import PropTypes from 'prop-types'
import { Card, Div, Button } from "@vkontakte/vkui"

import './Desk.css'
import { deleteDesk } from "../../actions"
import Context from "../App/context"

const Desk = ({ id, children, name }) => {
    const { goToColumns, removeDesk } = useContext(Context)

    // Удаление доски
    const deleteItem = (e) => {
        e.stopPropagation()

        deleteDesk(id)
            .then(() => removeDesk(id))
            .catch(console.error)
    }

    return (
        <Card size="l" onClick={() => goToColumns(name, id)}>
            <Div className="Desk__content">
                { children }
                <Button mode="destructive" onClick={deleteItem}>Удалить</Button>
            </Div>
        </Card>
    )
}

Desk.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
    name: PropTypes.string.isRequired
}

export default Desk
