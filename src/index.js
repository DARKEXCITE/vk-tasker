import "core-js/features/map"
import "core-js/features/set"
import React from "react"
import ReactDOM from "react-dom"
// import bridge from "@vkontakte/vk-bridge"

import App from "./components/App/App"
import { initializeFirebase } from "./actions"

// Init VK Mini App
// bridge.send("VKWebAppInit")

// Init Firebase
initializeFirebase()

ReactDOM.render(<App />, document.getElementById("root"))
