import React from "react"
import { useDispatch } from "react-redux"
import { Div, Button, Card, Header, usePlatform, ActionSheet, ActionSheetItem, IOS } from "@vkontakte/vkui"
import PropTypes from 'prop-types'
import Icon20More from '@vkontakte/icons/dist/20/more'

import Cards from "../Cards/Cards"
import { setPopout } from "../../redux/actions"
import { deleteColumn } from "../../redux/reducers/columns"
import './Column.css'

const Column = ({ name, id }) => {
    const dispatch = useDispatch()
    const osname = usePlatform()

    // Отображение опций колонки
    const showColumnOptions = () => {
        dispatch(setPopout((
            <ActionSheet onClose={() => dispatch(setPopout(null))}>
                <ActionSheetItem mode="destructive" autoclose onClick={() => dispatch(deleteColumn(id))}>
                    Удалить
                </ActionSheetItem>
                {osname === IOS && <ActionSheetItem autoclose mode="cancel">Отменить</ActionSheetItem>}
            </ActionSheet>
        )))
    }

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

export default Column
