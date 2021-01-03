import React, { Fragment, useEffect, useContext } from "react"
import { Card, Gallery, PanelHeaderSimple, Div, PanelHeaderBack } from "@vkontakte/vkui"

import Column from "../../components/Column/Column"
import Context from "../../components/App/context"
import CreateForm from "../../components/CreateForm/CreateForm"
import { createColumn, getColumns } from "../../actions"
import '../../components/Column/Column.css'
import "./Columns.css"

const Columns = () => {
    const { setColumns, goToDesks, addColumn, columns, deskId, deskName } = useContext(Context)

    // Получаем все колонки из БД
    useEffect(() => {
        getColumns(deskId)
            .then(setColumns)
    }, [])

    // Создание новой колонки
    const createItem = (name) => {
        return createColumn(name, deskId)
            .then((doc) => addColumn({ id: doc.id, ...doc.data() }))
            .catch(console.error)
    }

    return (
        <Fragment>
            {/* Заголовок */}
            <PanelHeaderSimple left={<PanelHeaderBack onClick={goToDesks} />}>{deskName}</PanelHeaderSimple>

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
