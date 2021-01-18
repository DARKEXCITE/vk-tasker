import React, { Fragment, memo, useState, useCallback } from "react"
import { Button, FixedLayout, Div, Textarea } from "@vkontakte/vkui"
import { useDispatch, useSelector } from "react-redux"

import { useRoute } from "react-router5"
import { getText } from "../../selectors"
import TextContent from "../TextContent/TextContent"
import { deleteCardItem, editCard } from "../../reducer"
import './CardContent.css'

const CardContent = () => {
    const dispatch = useDispatch()
    const text = useSelector(getText)
    const { route: { params: { cardId } } } = useRoute()

    const [isEditableMode, setEditableMode] = useState(!text)
    const [value, setValue] = useState(text || '')

    const changeMode = useCallback(() => {
        if (isEditableMode && value.trim().length) {
            dispatch(editCard(cardId, { text: value }))
                .finally(() => setEditableMode(!isEditableMode))
        } else {
            setEditableMode(!isEditableMode)
        }
    }, [isEditableMode, value, dispatch, cardId])

    const changeValue = useCallback(({ target: { value } }) => setValue(value), [])

    const deleteItem = useCallback(() => {
        dispatch(deleteCardItem())
            .finally(() => window.history.back())
    }, [dispatch])

    return (
        <Fragment>
            {isEditableMode
                ? (
                    <Div>
                        <Textarea onInput={changeValue} defaultValue={value} />
                    </Div>
                )
                : <TextContent />
            }

            <FixedLayout vertical="bottom">
                <Div className="card-content__buttons">
                    <Button mode="commerce" type="button" size="l" onClick={changeMode}>
                        {isEditableMode ? 'Сохранить' : 'Изменить'}
                    </Button>
                    <Button mode="destructive" type="button" size="l" onClick={deleteItem}>Удалить</Button>
                </Div>
            </FixedLayout>
        </Fragment>
    )
}

export default memo(CardContent)
