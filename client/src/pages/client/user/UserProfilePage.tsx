import React from 'react'
import { Tabs, Card, Result, Button } from 'antd'
import MainLayout from '@/components/client/layouts/MainLayout'
import UserInfoCard from '@/components/admin/UserInfoCard'
import { getUserFromCookie } from '@/utils/useGetToken'
import { OrderStatus } from '@/pages/client/user/components/OrderStatus'
import { FavoriteItems } from '@/pages/client/user/components/FavoriteItems'
import { ProfileSettings } from '@/pages/client/user/components/ProfileSettings'

export default function UserProfilePage() {
    const user = getUserFromCookie()
    if (!user) {
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
            children: <OrderStatus />,
        },
        {
            key: 'favorites',
            label: 'Favorites',
            children: <FavoriteItems />,
        },
        {
            key: 'settings',
            label: 'Profile Settings',
            children: <ProfileSettings />,
        },
    ]

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto p-6">
                <UserInfoCard />

                <Card className="mt-6">
                    <Tabs defaultActiveKey="orders" items={items} />
                </Card>
            </div>
        </MainLayout>
    )
}
