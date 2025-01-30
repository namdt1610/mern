import './index.css'
import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { ConfigProvider, theme, App as AntApp } from 'antd'
import { Provider } from 'react-redux'
import store from '@/redux/Store'
import App from './App'

const AppWrapper = () => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#111111',
                    fontFamily: 'Karla Variable, sans-serif',
                },
            }}
        >
            <AntApp>
                <Router>
                    <App />
                </Router>
            </AntApp>
        </ConfigProvider>
    )
}

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <AppWrapper />
        </Provider>
    </React.StrictMode>
)
