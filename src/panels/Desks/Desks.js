import React, { Fragment, useContext } from "react"
import { PanelHeaderSimple, Div } from "@vkontakte/vkui"

import DesksList from "../../components/DesksList/DesksList"
import CreateForm from "../../components/CreateForm/CreateForm"
import Context from "../../components/App/context"
import { createDesk } from "../../actions"


const Desks = () => {
    const { addDesk } = useContext(Context)

    // Создание новой доски
    const createItem = (name) => {
        return createDesk(name)
            .then((doc) => addDesk({ id: doc.id, ...doc.data() }))
            .catch(console.error)
    }

    return (
        <Fragment>
            {/* Заголовок */}
            <PanelHeaderSimple>Мои доски</PanelHeaderSimple>

            {/* Компонент создания досок */}
            <Div>
                <CreateForm onSubmit={createItem} placeholder="Введите название доски" actionTitle="Создать доску" />
            </Div>

            {/* Список всех досок */}
            <DesksList />
        </Fragment>
    )
}

export default Desks
