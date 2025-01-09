import './index.css'
import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'
import { Provider } from 'react-redux'
import store from '@/redux/Store'
import App from './App'
import ThemeToggle from './components/shared/ThemeToggle'

const AppWrapper = () => {
    const [isDark, setIsDark] = useState(false)

    return (
        <ConfigProvider
            theme={{
                algorithm: isDark
                    ? theme.darkAlgorithm
                    : theme.defaultAlgorithm,
                token: {
                    // Base styles
                    fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    colorPrimary: '#0071E3',
                    colorBgBase: isDark ? '#141414' : '#ffffff',
                    colorText: isDark ? '#ffffff' : '#1D1D1F',
                    colorTextSecondary: isDark
                        ? 'rgba(255, 255, 255, 0.6)'
                        : 'rgba(60, 60, 67, 0.6)',
                    colorBgContainer: isDark
                        ? '#141414'
                        : 'rgba(255, 255, 255, 0.8)',
                    borderRadius: 10,
                    controlHeight: 36,
                    boxShadow: isDark
                        ? '0 1px 4px rgba(255, 255, 255, 0.05)'
                        : '0 1px 4px rgba(0, 0, 0, 0.05)',
                    motionDurationMid: '0.2s',
                    motionEaseInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
                },
                components: {
                    Layout: {
                        colorBgBody: isDark ? '#141414' : '#ffffff',
                        colorBgHeader: isDark ? '#1f1f1f' : '#ffffff',
                    },
                    Button: {
                        controlHeight: 36,
                        borderRadius: 10,
                        paddingInline: 16,
                        fontSize: 14,
                        fontWeight: 500,
                        colorPrimary: '#0071E3',
                        colorPrimaryHover: 'rgba(0, 113, 227, 0.9)',
                        colorPrimaryActive: 'rgba(0, 113, 227, 0.8)',
                        controlOutline: 'rgba(0, 113, 227, 0.3)',
                        colorBorder: 'rgba(0, 0, 0, 0.1)',
                        // Animation
                        motionDurationMid: '0.1s',
                        motionEaseInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    },
                    Input: {
                        controlHeight: 36,
                        borderRadius: 10,
                        paddingInline: 12,
                        colorBorder: 'rgba(0, 0, 0, 0.1)',
                        fontSize: 14,
                        motionDurationMid: '0.1s',
                    },
                    Select: {
                        controlHeight: 36,
                        borderRadius: 10,
                        colorBorder: 'rgba(0, 0, 0, 0.1)',
                        fontSize: 14,
                        optionSelectedBg: 'rgba(0, 113, 227, 0.1)',
                        motionDurationMid: '0.1s',
                    },
                    Card: {
                        borderRadius: 12,
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                        colorBorderSecondary: 'rgba(0, 0, 0, 0.1)',
                        motionDurationMid: '0.2s',
                        // Glass effect
                        colorBgContainer: isDark
                            ? '#141414'
                            : 'rgba(255, 255, 255, 0.8)',
                    },
                    Table: {
                        borderRadius: 12,
                        fontSize: 14,
                        headerBg: 'rgba(245, 245, 247, 0.8)',
                        headerColor: '#1D1D1F',
                        rowHoverBg: 'rgba(245, 245, 247, 0.6)',
                        headerSplitColor: 'rgba(0, 0, 0, 0.1)',
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                        motionDurationMid: '0.1s',
                    },
                    Menu: {
                        itemHeight: 36,
                        itemHoverBg: 'rgba(245, 245, 247, 0.8)',
                        itemSelectedBg: 'rgba(0, 113, 227, 0.1)',
                        itemColor: '#1D1D1F',
                        itemSelectedColor: '#0071E3',
                        itemHoverColor: '#0071E3',
                        fontSize: 14,
                        motionDurationMid: '0.1s',
                        motionEaseInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    },
                    Modal: {
                        borderRadius: 12,
                        headerBg: 'rgba(255, 255, 255, 0.8)',
                        titleFontSize: 18,
                        paddingLG: 24,
                        padding: 20,
                        motionDurationMid: '0.2s',
                        // Glass effect
                        contentBg: 'rgba(255, 255, 255, 0.8)',
                    },
                    Tabs: {
                        cardBg: 'rgba(245, 245, 247, 0.8)',
                        itemSelectedColor: '#0071E3',
                        itemHoverColor: '#0071E3',
                        inkBarColor: '#0071E3',
                        borderRadius: 10,
                        motionDurationMid: '0.1s',
                    },
                    Form: {
                        labelFontSize: 14,
                        fontSize: 14,
                    },
                    Typography: {
                        fontSizeHeading1: 40,
                        fontSizeHeading2: 32,
                        fontSizeHeading3: 24,
                        fontSizeHeading4: 20,
                        fontSizeHeading5: 16,
                    },
                    Dropdown: {
                        motionDurationMid: '0.1s',
                        controlHeight: 36,
                        borderRadius: 10,
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                    },
                    Message: {
                        borderRadius: 10,
                        motionDurationMid: '0.1s',
                    },
                    Notification: {
                        borderRadius: 12,
                        motionDurationMid: '0.2s',
                    },
                },
            }}
        >
            <Router>
                <App />
                <ThemeToggle
                    isDark={isDark}
                    toggleTheme={() => setIsDark(!isDark)}
                />
            </Router>
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
