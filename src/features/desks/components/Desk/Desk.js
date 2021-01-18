import React, { useCallback, memo, useState } from "react"
import PropTypes from 'prop-types'
import { useRouter } from 'react-router5'
import { useDispatch } from "react-redux"
import { Card, Div, Button, ActionSheet, ActionSheetItem, IOS, usePlatform } from "@vkontakte/vkui"
import Icon20More from "@vkontakte/icons/dist/20/more"

import { pages } from "../../../../config/router"
import { setPopout } from "../../../../app/actions"
import { deleteDesk, editDesk } from "../../reducer"
import { modes } from "../../../../components/CreateForm/hooks"
import CreateForm from "../../../../components/CreateForm/CreateForm"
import './Desk.css'

const Desk = ({ id, children }) => {
    const [isEditableState, setEditableState] = useState(false)

    const dispatch = useDispatch()
    const router = useRouter()
    const osname = usePlatform()

    const onClosePopout = useCallback(() => dispatch(setPopout(null)), [dispatch])
    const goToColumnPanel = useCallback(() => router.navigate(pages.COLUMNS, { deskId: id }), [router, id])
    const deleteItem = useCallback(() => dispatch(deleteDesk(id)), [dispatch, id])
    const onSubmit = useCallback((name) => dispatch(editDesk(id, name)).finally(() => setEditableState(false)), [dispatch, id])
    const onCancel = useCallback(() => setEditableState(false), [])
    const editItem = useCallback(() => setEditableState(true), [])

    // Отображение опций доски
    const showDeskOptions = useCallback((e) => {
        e.stopPropagation()
        dispatch(setPopout((
            <ActionSheet onClose={onClosePopout}>
                <ActionSheetItem mode="default" onClick={editItem} autoclose>Редактировать</ActionSheetItem>
                <ActionSheetItem mode="destructive" onClick={deleteItem} autoclose>Удалить</ActionSheetItem>
                {osname === IOS && <ActionSheetItem autoclose mode="cancel">Отменить</ActionSheetItem>}
            </ActionSheet>
        )))
    }, [dispatch, deleteItem, osname, onClosePopout, editItem])

    if (isEditableState) {
        return <CreateForm onSubmit={onSubmit} placeholder="Введите название доски" actionTitle="Изменить" initialValue={children} initialMode={modes.form} onCancel={onCancel} />
    }

    return (
        <Card size="l" onClick={goToColumnPanel}>
            <Div className="Desk__content">
                { children }
                <Button mode="tertiary" onClick={showDeskOptions}><Icon20More /></Button>
            </Div>
        </Card>
    )
}

Desk.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired
}

export default memo(Desk)
