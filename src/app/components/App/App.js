import React, { useEffect, memo }  from 'react'
import { Panel, View } from '@vkontakte/vkui'
import { useRoute } from 'react-router5'
import { useSelector, useDispatch } from "react-redux"

import Desks from "../../../features/desks/panels/Desks/Desks"
import Columns from "../../../features/columns/panels/Columns/Columns"
import Card from "../../../features/card/panels/Card/Card"
import { pages } from "../../../config/router"
import { changeRoute } from '../../actions'
import { getActivePanel, getPopout } from "../../selectors"
import "../../../features/columns/panels/Columns/Columns.css"

const App = () => {
    const dispatch = useDispatch()

    const activePanel = useSelector(getActivePanel)
    const popout = useSelector(getPopout)
    const { route, router } = useRoute()

    useEffect(() => {
        router.subscribe((...args) => dispatch(changeRoute(...args)))
        dispatch(changeRoute({ route }))
    }, [dispatch, route, router])

    if (!activePanel) {
        return null
    }

    return (
        <View activePanel={activePanel} header={false} popout={popout}>
            <Panel id={pages.DESKS} separator={false}>
                <Desks />
            </Panel>

            <Panel id={pages.COLUMNS} separator={false} className="Columns">
                <Columns />
            </Panel>

            <Panel id={pages.CARD} separator={false}>
                <Card />
            </Panel>
        </View>
    )
}

export default memo(App);
