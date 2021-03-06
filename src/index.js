import "core-js/features/map"
import "core-js/features/set"
import React from "react"
import ReactDOM from "react-dom"
import bridge from "@vkontakte/vk-bridge"

import AppContainer from "./app/components/App/AppContainer"
import { initializeFirebase } from "./app/firebase"
import { initializeRouter } from './config/router'

if (process.env.NODE_ENV === 'development') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render')
    whyDidYouRender(React, {
        trackAllPureComponents: true,
        trackExtraHooks: [
            [require('react-redux/lib'), 'useSelector']
        ]
    })
}

// Init VK Mini App
bridge.send("VKWebAppInit")

// Init Firebase
initializeFirebase()

// Init Router
const route = initializeRouter()

ReactDOM.render(<AppContainer router={route} />, document.getElementById("root"))
