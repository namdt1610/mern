// src/layouts/Content.tsx
import React, { lazy, Suspense } from 'react'
import { Layout } from 'antd'

const { Content } = Layout

// Lazy load các component nặng
const UserInfoCard = lazy(() => import('@/components/admin/UserInfoCard'))
const Breadcrumb = lazy(() => import('@/components/admin/Breadcrumb'))

interface ContentAreaProps {
    children: React.ReactNode
}

export default function ContentArea({ children }: ContentAreaProps) {
    return (
        <Content
            style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                borderRadius: 12,
                backdropFilter: 'blur(10px)',
            }}
        >
            <Suspense fallback={<div>Loading...</div>}>
                <div className="grid grid-cols-2 gap-4">
                    <UserInfoCard />
                    <Breadcrumb />
                </div>
            </Suspense>
            {children}
        </Content>
    )
}
