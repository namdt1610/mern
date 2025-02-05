// src/layouts/AdminLayout.tsx
import React, { useState } from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import HeaderBar from './components/Header'
import ContentArea from './components/Content'

const { Sider } = Layout

export default function AdminLayout() {
    const [collapsed, setCollapsed] = useState(true)

    const onLogout = () => {
        // Xử lý logout ở đây
        console.log('Logout')
    }

    return (
        <Layout>
            <Sider
                width={256}
                trigger={null}
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                breakpoint="lg"
                style={{
                    overflowY: 'auto',
                    backdropFilter: 'blur(10px)',
                    borderRight: '1px solid rgba(0, 0, 0, 0.06)',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    zIndex: 100,
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            >
                <Sidebar
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    onLogout={onLogout}
                />
            </Sider>
            <Layout
                style={{
                    marginLeft: collapsed ? 80 : 256,
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    minHeight: '100vh',
                }}
            >
                <HeaderBar collapsed={collapsed} setCollapsed={setCollapsed} />
                <ContentArea>
                    <Outlet />
                </ContentArea>
            </Layout>
        </Layout>
    )
}
