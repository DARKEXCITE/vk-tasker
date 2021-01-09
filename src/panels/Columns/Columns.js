import React, { Fragment, useEffect } from "react"
import { Card, Gallery, PanelHeaderSimple, Div, PanelHeaderBack } from "@vkontakte/vkui"
import { useRoute } from 'react-router5'
import { useSelector, useDispatch } from "react-redux"

import Column from "../../components/Column/Column"
import CreateForm from "../../components/CreateForm/CreateForm"
import { createColumn, getColumns } from "../../actions"
import { addColumn, setActivePanel, setColumns } from "../../redux/actions"
import { pages } from "../../config/router"
import '../../components/Column/Column.css'
import "./Columns.css"

const Columns = () => {
    const dispatch = useDispatch()

    const { columns } = useSelector(s => s.columns)
    const { desks } = useSelector(s => s.desks)

    const { route: { params: { deskId } } } = useRoute()
    const desk = desks.find(({ id }) => id === deskId) || {}

    // Получаем все колонки из БД
    useEffect(() => {
        if (desk.id) {
            getColumns(desk.id)
                .then((columns) => dispatch(setColumns(columns)))
        }
    }, [desk])

    // Создание новой колонки
    const createItem = (name) => {
        return createColumn(name, deskId)
            .then((doc) => dispatch(addColumn({ id: doc.id, ...doc.data() })))
            .catch(console.error)
    }

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
                {columns.map(({ id, name }) => <Column key={id} name={name} id={id} />)}

                <Div className="Column">
                    <Card className="Column__wrapper">
                        <CreateForm onSubmit={createItem} placeholder="Введите название колонки" actionTitle="Создать" />
                    </Card>
                </Div>
            </Gallery>
        </Fragment>
    )
}

export default Columns
