import React from 'react'
import MainLayout from '@/components/client/layouts/MainLayout'
import UserProfilePage from '@/features/client/user/User'

export default function UserPage() {
    return (
        <MainLayout>
            <UserProfilePage />
        </MainLayout>
    )
}
