import React from 'react'
import { Layout } from 'antd/lib'
const { Footer } = Layout

function AppFooter() {
    return (
        <Footer style={{ textAlign: 'center' }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
    )
}

export default AppFooter
