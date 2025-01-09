import React from 'react'
import { Button } from 'antd'
import { BulbOutlined, BulbFilled } from '@ant-design/icons'

interface ThemeToggleProps {
    isDark: boolean
    toggleTheme: () => void
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, toggleTheme }) => {
    return (
        <Button
            icon={isDark ? <BulbOutlined /> : <BulbFilled />}
            onClick={toggleTheme}
            type="text"
            size="large"
        />
    )
}

export default ThemeToggle
