import React, { Fragment, useEffect, useCallback, memo } from "react"
import { Card, Gallery, PanelHeaderSimple, Div, PanelHeaderBack } from "@vkontakte/vkui"
import { useSelector, useDispatch } from "react-redux"
import { useRoute } from 'react-router5'

import CreateForm from "../../../../components/CreateForm/CreateForm"
import { createColumn, fetchColumns } from "../../reducer"
import { setActivePanel } from "../../../../app/actions"
import { getDesks } from "../../../desks/selectors"
import Column from "../../components/Column/Column"
import { pages } from "../../../../config/router"
import { getColumns } from "../../selectors"
import '../../components/Column/Column.css'
import "./Columns.css"

const Columns = () => {
    const dispatch = useDispatch()

    const columns = useSelector(getColumns)
    const desks = useSelector(getDesks)

    const { route: { params: { deskId } } } = useRoute()
    const desk = desks.find(({ id }) => id === deskId) || {}

    // Создание новой колонки
    const onSubmit = useCallback((name) => dispatch(createColumn(name, deskId)), [dispatch, deskId])

    // Переход к панели с досками
    const goToDesks = useCallback(() => {
        window.history.back()
        return dispatch(setActivePanel(pages.DESKS))
    }, [dispatch])

    // Получаем все колонки из БД
    useEffect(() => {
        if (deskId) {
            dispatch(fetchColumns(deskId))
        }
    }, [dispatch, deskId])

    return (
        <Fragment>
            {/* Заголовок доски */}
            <PanelHeaderSimple left={<PanelHeaderBack onClick={goToDesks} />}>
                {desk.name ? desk.name : 'Доска'}
            </PanelHeaderSimple>

            {/* Компонент галереи колонок */}
            <Gallery slideWidth="90%" align="left" className="Columns__list">
                {columns.map(({ id, name }) => <Column key={id} name={name} id={id} />)}

                <Div className="Column">
                    <Card className="Column__wrapper">
                        <CreateForm onSubmit={onSubmit} placeholder="Введите название колонки" actionTitle="Создать" />
                    </Card>
                </Div>
            </Gallery>
        </Fragment>
    )
}

export default memo(Columns)
