import React, { Fragment, useEffect, useState } from "react"
import { PanelHeaderBack, PanelHeaderSimple, PanelSpinner } from "@vkontakte/vkui"
import { useDispatch, useSelector } from "react-redux"
import { useRoute } from "react-router5"

import { fetchCard } from "../../reducer"
import { getName } from "../../selectors"
import {setActivePanel} from "../../../../app/actions"
import { pages } from "../../../../config/router"
import CardContent from "../../components/CardContent/CardContent"


const Card = () => {
    const dispatch = useDispatch()

    const name = useSelector(getName)

    const [isLoading, setLoader] = useState(true)
    const { route: { params: { cardId } } } = useRoute()

    useEffect(() => {
        if (cardId) {
            dispatch(fetchCard(cardId))
                .finally(() => setLoader(false))
        }
    }, [cardId])

    // Переход к панели с досками
    const goToColumns = () => {
        window.history.back()
        return dispatch(setActivePanel(pages.COLUMNS))
    }

    return (
        <Fragment>
            {/* Заголовок */}
            <PanelHeaderSimple left={<PanelHeaderBack onClick={goToColumns} />}>{name ? `«${name}»` : ''}</PanelHeaderSimple>

            {/* Спинер при загрузке карточки */}
            {isLoading && <PanelSpinner />}

            <CardContent />
        </Fragment>
    )
}

export default Card
