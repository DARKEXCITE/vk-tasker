import React, { useEffect }  from 'react'
import { Panel, View } from '@vkontakte/vkui'
import { useRoute } from 'react-router5'
import { useSelector, useDispatch } from "react-redux"

import Desks from "../../panels/Desks/Desks"
import Columns from "../../panels/Columns/Columns"
import { pages } from "../../config/router"
import { changeRoute } from '../../redux/actions'
import "../../panels/Columns/Columns.css"

const App = () => {
    const dispatch = useDispatch()

    const { activePanel } = useSelector(s => s.activePanel)
    const { popout } = useSelector(s => s.popout)
    const { route, router } = useRoute()

    useEffect(() => {
        router.subscribe((...args) => dispatch(changeRoute(...args)))

        dispatch(changeRoute({ route }))
    }, [dispatch])

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
        </View>
    )
}

export default App;
