import React from 'react'
import { Tabs, Card, Result, Button } from 'antd'
import MainLayout from '@/components/client/layouts/MainLayout'
import UserInfoCard from '@/components/admin/UserInfoCard'
import { OrderStatus, FavoriteItems, ProfileSettings } from '.'
import { useUser } from './hooks/useUser'
import ErrorBoundary from '@/components/shared/ErrorBoudaries'

export default function UserProfilePage() {
    const { userId } = useUser()

    if (!userId) {
        return (
            <MainLayout>
                <Result
                    status="403"
                    title="403"
                    subTitle="Please log in to continue."
                    extra={<Button href="/login">Log in</Button>}
                />
            </MainLayout>
        )
    }

    const items = [
        {
            key: 'orders',
            label: 'My Orders',
            children: <OrderStatus userId={userId} />,
        },
        {
            key: 'favorites',
            label: 'Favorites',
            children: <FavoriteItems userId={userId} />,
        },
        {
            key: 'settings',
            label: 'Profile Settings',
            children: <ProfileSettings userId={userId} />,
        },
    ]

    return (
        <ErrorBoundary>
            <div className="max-w-7xl mx-auto p-6">
                <UserInfoCard />

                <Card className="mt-6">
                    <Tabs defaultActiveKey="orders" items={items} />
                </Card>
            </div>
        </ErrorBoundary>
    )
}
