import React from 'react'
import AuthLayout from '@/components/client/layouts/AuthLayout'
import Login from '@/features/client/login/Login'

export default function LoginPage() {
    return (
        <AuthLayout>
            <Login />
        </AuthLayout>
    )
}
