import React from 'react'
import { Div } from "@vkontakte/vkui"
import { useSelector } from "react-redux"
import ReactMarkdown from 'react-markdown'

import { getText } from "../../selectors"

const CardContent = () => {
    const text = useSelector(getText)

    if (!text) return null

    return (
        <Div>
            <ReactMarkdown>
                {text.replace(/\\n/g, '\n')}
            </ReactMarkdown>
        </Div>
    )
}

export default CardContent
