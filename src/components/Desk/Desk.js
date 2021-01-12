import React from "react"
import PropTypes from 'prop-types'
import { useRouter } from 'react-router5'
import { useDispatch } from "react-redux"
import { Card, Div, Button } from "@vkontakte/vkui"

import { deleteDesk } from "../../redux/reducers/desks"
import { pages } from "../../config/router"
import './Desk.css'

const Desk = ({ id, children }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const goToColumnPanel = () => router.navigate(pages.COLUMNS, { deskId: id })

    return (
        <Card size="l" onClick={goToColumnPanel}>
            <Div className="Desk__content">
                { children }
                <Button
                    mode="destructive"
                    onClick={(e) => {
                        e.stopPropagation()
                        dispatch(deleteDesk(id))
                    }}
                >
                    Удалить
                </Button>
            </Div>
        </Card>
    )
}

Desk.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired
}

export default Desk
