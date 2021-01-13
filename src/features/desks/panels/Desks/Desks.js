import React, { Fragment, useCallback, memo } from "react"
import { PanelHeaderSimple, Div } from "@vkontakte/vkui"
import { useDispatch } from "react-redux"

import DesksList from "../../components/DesksList/DesksList"
import CreateForm from "../../../../components/CreateForm/CreateForm"
import { createDesk } from "../../reducer"


const Desks = () => {
    const dispatch = useDispatch()

    const onSubmit = useCallback((name) => dispatch(createDesk(name)), [dispatch])

    return (
        <Fragment>
            {/* Заголовок */}
            <PanelHeaderSimple>TASKER</PanelHeaderSimple>

            {/* Компонент создания досок */}
            <Div>
                <CreateForm onSubmit={onSubmit} placeholder="Введите название доски" actionTitle="Создать доску" />
            </Div>

            {/* Список всех досок */}
            <DesksList />
        </Fragment>
    )
}

export default memo(Desks)
