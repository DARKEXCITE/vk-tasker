import React, { useCallback, memo }  from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import Icon20More from '@vkontakte/icons/dist/20/more'
import { ActionSheet, ActionSheetItem, Button, Card, Div, IOS, usePlatform } from "@vkontakte/vkui"
import { useRouter } from "react-router5"

import { deleteCard } from "../../reducer"
import { pages } from "../../../../config/router"
import { setPopout } from "../../../../app/actions"
import "./ColumnCard.css"

const ColumnCard = ({ children, id }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const osname = usePlatform()

    const onClosePopout = useCallback(() => dispatch(setPopout(null)), [dispatch])
    const goToCardPage = useCallback(() => router.navigate(pages.CARD, { cardId: id }), [router, id])
    const deleteItem = useCallback(() => dispatch(deleteCard(id)), [dispatch, id])

    // Отображение опций карточки
    const showCardOptions = useCallback((e) => {
        e.stopPropagation()
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
        <Card size="l" onClick={goToCardPage}>
            <Div className="ColumnCard__wrapper">
                <div>{children}</div>
                <Button mode="tertiary" onClick={showCardOptions}><Icon20More /></Button>
            </Div>
        </Card>
    )
}

ColumnCard.propTypes = {
    children: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
}

export default memo(ColumnCard)
