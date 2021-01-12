import React from 'react'
import { RouterProvider } from 'react-router5'
import { Provider } from 'react-redux'
import '@vkontakte/vkui/dist/vkui.css'

import App from "./App"
import store from '../../redux'
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary"

const AppContainer = ({ router }) => {
    return (
        <RouterProvider router={router}>
            <Provider store={store}>
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
            </Provider>
        </RouterProvider>
    )
}

export default AppContainer;
