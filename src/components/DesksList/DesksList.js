import React, { useEffect } from "react"
import { CardGrid } from "@vkontakte/vkui"
import { useDispatch, useSelector } from "react-redux"

import Desk from "../Desk/Desk"
import { getDesks } from "../../actions"
import { setDesks } from "../../redux/actions"

const DeskList = () => {
    const dispatch = useDispatch()

    const { desks } = useSelector(s => s.desks)

    // Получение досок из БД
    useEffect(() => {
        getDesks()
            .then((desks) => dispatch(setDesks(desks)))
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
