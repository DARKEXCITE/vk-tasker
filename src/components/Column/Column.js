import React, { useContext } from "react"
import { Div, Button, Card, Header, ActionSheet, ActionSheetItem, usePlatform, IOS } from "@vkontakte/vkui"
import PropTypes from 'prop-types'
import Icon20More from '@vkontakte/icons/dist/20/more'

import Context from "../App/context"
import { deleteColumn } from "../../actions"
import './Column.css'
import Cards from "../Cards/Cards";

const Column = ({ name, id }) => {
    const { removeColumn, setPopout } = useContext(Context)

    // Проверка платформы пользовтеля
    const osname = usePlatform()

    // Удаление колонки
    const deleteItem = () => {
        deleteColumn(id)
            .then(() => removeColumn(id))
            .catch(console.error)
    }

    // Отображение опций колонки
    const showColumnOptions = () => {
        setPopout((
            <ActionSheet onClose={() => setPopout(null)}>
                <ActionSheetItem mode="destructive" autoclose onClick={deleteItem}>
                    Удалить
                </ActionSheetItem>
                {osname === IOS && <ActionSheetItem autoclose mode="cancel">Отменить</ActionSheetItem>}
            </ActionSheet>
        ))
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
