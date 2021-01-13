import React, { useCallback, memo } from "react"
import { useDispatch } from "react-redux"
import { Div, Button, Card, Header, usePlatform, ActionSheet, ActionSheetItem, IOS } from "@vkontakte/vkui"
import PropTypes from 'prop-types'
import Icon20More from '@vkontakte/icons/dist/20/more'

import Cards from "../../../cards/components/Cards/Cards"
import { setPopout } from "../../../../app/actions"
import { deleteColumn } from "../../reducer"
import './Column.css'

const Column = ({ name, id }) => {
    const dispatch = useDispatch()
    const osname = usePlatform()

    const onClosePopout = useCallback(() => dispatch(setPopout(null)), [dispatch])
    const deleteItem = useCallback(() => dispatch(deleteColumn(id)), [dispatch, id])

    // Отображение опций колонки
    const showColumnOptions = useCallback(() => {
        dispatch(setPopout((
            <ActionSheet onClose={onClosePopout}>
                <ActionSheetItem mode="destructive" onClick={deleteItem} autoclose>
                    Удалить
                </ActionSheetItem>
                {osname === IOS && <ActionSheetItem autoclose mode="cancel">Отменить</ActionSheetItem>}
            </ActionSheet>
        )))
    }, [dispatch, deleteItem, osname, onClosePopout])

    return (
        <Div className="Column">
            <Card className="Column__wrapper">
                {/* Шапка колонки с заголовком и кнопкой удаления */}
                <div className="Column__header">
                    <Header>{name}</Header>
                    <Button mode="tertiary" onClick={showColumnOptions}><Icon20More /></Button>
                </div>

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
