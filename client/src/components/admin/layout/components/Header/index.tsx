// src/layouts/Header.tsx
import React from 'react'
import { Layout, Button } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

const { Header } = Layout

interface HeaderProps {
    collapsed: boolean
    setCollapsed: (value: boolean) => void
}

export default function HeaderBar({ collapsed, setCollapsed }: HeaderProps) {
    return (
        <Header
            style={{
                padding: '0 16px',
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid #f0f0f0',
            }}
        >
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{ marginRight: 16 }}
            />
            <h1 style={{ margin: 0, fontSize: '18px' }}>Admin Dashboard</h1>
        </Header>
    )
}
