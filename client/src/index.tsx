import './instrument'
import './index.css'
import App from './App'
import Cookies from 'js-cookie'
import store from '@/redux/store'
import enUS from 'antd/locale/en_US'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ConfigProvider, App as AntApp, theme } from 'antd'
import ThemeSwitcher from '@/components/shared/ThemeToggle'
import * as Sentry from '@sentry/react'

const THEME_KEY = 'user-theme'
const { darkAlgorithm, defaultAlgorithm } = theme

const AppWrapper = () => {
    // Lấy theme từ cookie khi ứng dụng khởi động
    const savedTheme = Cookies.get(THEME_KEY)
    const initialTheme = savedTheme === 'dark' ? true : false

    const [isDarkMode, setIsDarkMode] = useState(initialTheme)

    useEffect(() => {
        Cookies.set(THEME_KEY, isDarkMode ? 'dark' : 'light', { expires: 365 })
        // Cập nhật attribute trên body để dùng cho CSS custom nếu cần
        document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
    }, [isDarkMode])

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev)
    }

    return (
        <ConfigProvider
            locale={enUS}
            theme={{
                algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
                token: {
                    colorPrimary: isDarkMode ? '#722ed1' : '#000000',
                    colorInfo: isDarkMode ? '#722ed1' : '#1890ff',
                    colorPrimaryBg: isDarkMode ? '' : 'rgba(0, 0, 0, 0.1)',
                    colorPrimaryBgHover: isDarkMode ? '' : 'rgba(0, 0, 0, 0.1)',
                    colorBgContainer: isDarkMode ? '#1f1f1f' : '#f0f2f5',
                    fontFamily: 'Karla Variable, sans-serif',
                },
                components: {
                    Layout: {
                        siderBg: isDarkMode ? '#1e1e1e' : '#ffffff', // Màu nền của Sider
                        headerBg: isDarkMode ? '#1e1e1e' : '#ffffff', // Màu nền của Header
                    },
                },
            }}
        >
            <ThemeSwitcher isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            <AntApp>
                <Router>
                    <App />
                </Router>
            </AntApp>
        </ConfigProvider>
    )
}

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container, {
    // Callback called when an error is thrown and not caught by an ErrorBoundary.
    onUncaughtError: Sentry.reactErrorHandler((error, errorInfo) => {
        console.warn('Uncaught error', error, errorInfo.componentStack)
    }),
    // Callback called when React catches an error in an ErrorBoundary.
    onCaughtError: Sentry.reactErrorHandler(),
    // Callback called when React automatically recovers from errors.
    onRecoverableError: Sentry.reactErrorHandler(),
})

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <AppWrapper />
        </Provider>
    </React.StrictMode>
)
