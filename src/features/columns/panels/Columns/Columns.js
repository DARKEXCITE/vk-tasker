import React, { Fragment, useEffect } from "react"
import { Card, Gallery, PanelHeaderSimple, Div, PanelHeaderBack } from "@vkontakte/vkui"
import { useRoute } from 'react-router5'
import { useSelector, useDispatch } from "react-redux"

import Column from "../../components/Column/Column"
import CreateForm from "../../../../components/CreateForm/CreateForm"
import { setActivePanel } from "../../../../app/actions"
import { pages } from "../../../../config/router"
import { getColumns } from "../../selectors"
import { getDesks } from "../../../desks/selectors"
import { createColumn, fetchColumns } from "../../reducer"
import '../../components/Column/Column.css'
import "./Columns.css"

const Columns = () => {
    const dispatch = useDispatch()

    const columns = useSelector(getColumns)
    const desks = useSelector(getDesks)

    const { route: { params: { deskId } } } = useRoute()
    const desk = desks.find(({ id }) => id === deskId) || {}

    // Получаем все колонки из БД
    useEffect(() => {
        if (desk.id) dispatch(fetchColumns(desk.id))
    }, [desk, dispatch])

    // Переход к панели с досками
    const goToDesks = () => {
        window.history.back()
        return dispatch(setActivePanel(pages.DESKS))
    }

    return (
        <Fragment>
            {/* Заголовок доски */}
            <PanelHeaderSimple left={<PanelHeaderBack onClick={goToDesks} />}>{desk.name ? desk.name : 'Доска'}</PanelHeaderSimple>

            {/* Компонент галереи колонок */}
            <Gallery slideWidth="90%" align="left" className="Columns__list">
                {columns && columns.map(({ id, name }) => <Column key={id} name={name} id={id} />)}

                <Div className="Column">
                    <Card className="Column__wrapper">
                        <CreateForm
                            onSubmit={(name) => dispatch(createColumn(name, deskId))}
                            placeholder="Введите название колонки"
                            actionTitle="Создать"
                        />
                    </Card>
                </Div>
            </Gallery>
        </Fragment>
    )
}

export default Columns
