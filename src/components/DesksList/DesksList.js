import React, { useEffect } from "react"
import { CardGrid } from "@vkontakte/vkui"
import { useDispatch, useSelector } from "react-redux"

import Desk from "../Desk/Desk"
import { fetchDesks } from "../../redux/reducers/desks"
import { getDesks } from "../../selectors/selectors"

const DeskList = () => {
    const dispatch = useDispatch()
    const desks = useSelector(getDesks)

    // Получение досок из БД
    useEffect(() => {
        dispatch(fetchDesks())
    }, [])

    // Если досок нет, то ничего не отображаем
    if (!desks.length) {
        return null;
    }

    return (
        // Рендер всех досок
        <CardGrid>
            {desks.map(({ id, name }) => <Desk key={id} id={id}>{name}</Desk>)}
        </CardGrid>
    )
}

export default DeskList
