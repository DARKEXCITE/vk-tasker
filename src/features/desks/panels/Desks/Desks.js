import React, { Fragment } from "react"
import { PanelHeaderSimple, Div } from "@vkontakte/vkui"
import { useDispatch } from "react-redux"

import DesksList from "../../components/DesksList/DesksList"
import CreateForm from "../../../../components/CreateForm/CreateForm"
import { createDesk } from "../../reducer"


const Desks = () => {
    const dispatch = useDispatch()

    return (
        <Fragment>
            {/* Заголовок */}
            <PanelHeaderSimple>TASKER</PanelHeaderSimple>

            {/* Компонент создания досок */}
            <Div>
                <CreateForm onSubmit={(name) => dispatch(createDesk(name))} placeholder="Введите название доски" actionTitle="Создать доску" />
            </Div>

            {/* Список всех досок */}
            <DesksList />
        </Fragment>
    )
}

export default Desks
