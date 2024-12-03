// UserInfoCard.tsx
import React, { useMemo } from 'react'
import { Card, Image, Typography, Spin, Button } from 'antd'
import { decodeToken, DecodedToken } from '../../utils/jwtDecode'
import { useLogoutMutation } from 'services/auth'
import Cookies from 'js-cookie'

const { Title, Text } = Typography

const UserInfoCard = () => {
    const decodedUser = useMemo(() => {
        const token = Cookies.get('user')
        if (!token) return null
        return decodeToken(token)
    }, [])

    if (!decodedUser) return <Spin tip="Loading user info..." />

    const [logout] = useLogoutMutation()
    const onLogout = async () => {
        try {
            await logout()
            Cookies.remove('user')
            window.location.href = '/admin/login'
        } catch (err) {
            console.error('Logout error:', err)
        }
    }

    return (
        <Card>
            <div className="flex justify-start">
                <Image
                    width={100}
                    src={
                        decodedUser?.avatar ||
                        'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                    }
                    alt="User avatar"
                />
                <div className="justify-center flex-col items-center">
                    <Title level={2}>
                        Welcome, {decodedUser?.name || 'User'}
                    </Title>
                    <Text type="secondary">{decodedUser?.email}</Text>
                    <Text type="secondary">Role: {decodedUser?.role}</Text>
                </div>
                <div>
                    <Button onClick={onLogout}>Logout</Button>
                </div>
            </div>
        </Card>
    )
}

export default UserInfoCard
