import React, { useCallback, memo, useState } from "react"
import { useDispatch } from "react-redux"
import { Div, Button, Card, Header, usePlatform, ActionSheet, ActionSheetItem, IOS } from "@vkontakte/vkui"
import PropTypes from 'prop-types'
import Icon20More from '@vkontakte/icons/dist/20/more'

import CreateForm from "../../../../components/CreateForm/CreateForm"
import { modes } from "../../../../components/CreateForm/hooks"
import Cards from "../../../cards/components/Cards/Cards"
import { deleteColumn, editColumn } from "../../reducer"
import { setPopout } from "../../../../app/actions"
import './Column.css'

const Column = ({ name, id }) => {
    const [isEditableState, setEditableState] = useState(false)
    const dispatch = useDispatch()
    const osname = usePlatform()

    const onClosePopout = useCallback(() => dispatch(setPopout(null)), [dispatch])
    const deleteItem = useCallback(() => dispatch(deleteColumn(id)), [dispatch, id])
    const onSubmit = useCallback((name) => dispatch(editColumn(id, name)).finally(() => setEditableState(false)), [dispatch, id])
    const onCancel = useCallback(() => setEditableState(false), [])
    const editItem = useCallback(() => setEditableState(true), [])

    // Отображение опций колонки
    const showColumnOptions = useCallback(() => {
        dispatch(setPopout((
            <ActionSheet onClose={onClosePopout}>
                <ActionSheetItem mode="default" onClick={editItem} autoclose>Редактировать</ActionSheetItem>
                <ActionSheetItem mode="destructive" onClick={deleteItem} autoclose>Удалить</ActionSheetItem>
                {osname === IOS && <ActionSheetItem autoclose mode="cancel">Отменить</ActionSheetItem>}
            </ActionSheet>
        )))
    }, [dispatch, deleteItem, osname, onClosePopout, editItem])



    return (
        <Div className="Column">
            <Card className="Column__wrapper">
                {/* Редактирование колонки */}
                {/* Шапка колонки с заголовком и кнопкой удаления */}
                {isEditableState
                    ? (
                        <div className="Column__edit-form">
                            <CreateForm onSubmit={onSubmit} placeholder="Введите название колонки" actionTitle="Изменить" initialValue={name} initialMode={modes.form} onCancel={onCancel} />
                        </div>
                    )
                    : (
                        <div className="Column__header">
                            <Header>{name}</Header>
                            <Button mode="tertiary" onClick={showColumnOptions}><Icon20More /></Button>
                        </div>
                    )
                }



                {/* Вывод всех карточек */}
                <Cards columnId={id} />
            </Card>
        </Div>
    )
}

Column.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
}

export default memo(Column)
