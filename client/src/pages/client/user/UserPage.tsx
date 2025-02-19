import React from 'react'
import MainLayout from '@/components/client/layouts/MainLayout'
import UserProfilePage from '@/features/client/user/UserProfilePage'

export default function UserPage() {
    return (
        <MainLayout>
            <UserProfilePage />
        </MainLayout>
    )
}
