import React, { useContext, useEffect } from "react"
import { CardGrid } from "@vkontakte/vkui"

import Desk from "../Desk/Desk"
import { getDesks } from "../../actions"
import Context from "../App/context"

const DeskList = () => {
    const { desks, setDesks } = useContext(Context)

    // Получение досок из БД
    useEffect(() => {
        getDesks(desks)
            .then(setDesks)
    }, [])

    // Если досок нет, то ничего не отображаем
    if (!desks.length) {
        return null;
    }

    return (
        // Рендер всех досок
        <CardGrid>
            {desks.map(({ id, name }) => {
                return (
                    <Desk
                        key={id}
                        id={id}
                        name={name}
                    >
                        {name}
                    </Desk>
                )
            })}
        </CardGrid>
    )
}

export default DeskList
