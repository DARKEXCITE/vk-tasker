import "core-js/features/map"
import "core-js/features/set"
import React from "react"
import ReactDOM from "react-dom"
// import bridge from "@vkontakte/vk-bridge"

import AppContainer from "./components/App/AppContainer"
import { initializeFirebase } from "./actions"
import { initializeRouter } from './config/router'

// Init VK Mini App
// bridge.send("VKWebAppInit")

// Init Firebase
initializeFirebase()

// Init Router
const route = initializeRouter()

ReactDOM.render(<AppContainer router={route} />, document.getElementById("root"))
