// ThemeSwitcher.tsx
import React from 'react'
import { Button } from 'antd'
import { BulbOutlined, BulbFilled } from '@ant-design/icons'
import Cookies from 'js-cookie'

const THEME_KEY = 'user-theme'
interface ThemeSwitcherProps {
    isDarkMode: boolean
    toggleTheme: () => void
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
    isDarkMode,
    toggleTheme,
}) => {
    return (
        <Button
            type="primary"
            shape="circle"
            icon={isDarkMode ? <BulbFilled /> : <BulbOutlined />}
            size="large"
            onClick={toggleTheme}
            style={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                zIndex: 1000,
            }}
        />
    )
}

export default ThemeSwitcher
