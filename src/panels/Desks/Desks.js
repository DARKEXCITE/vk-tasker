import React, { Fragment } from "react"
import { useDispatch } from "react-redux"
import { PanelHeaderSimple, Div } from "@vkontakte/vkui"

import DesksList from "../../components/DesksList/DesksList"
import CreateForm from "../../components/CreateForm/CreateForm"
import { createDesk } from "../../actions"
import { addDesk } from "../../redux/actions"


const Desks = () => {
    const dispatch = useDispatch()

    // Создание новой доски
    const createItem = (name) => {
        return createDesk(name)
            .then((doc) => dispatch(addDesk({ id: doc.id, ...doc.data() })))
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
