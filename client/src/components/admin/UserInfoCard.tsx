// UserInfoCard.tsx
import React, { useMemo } from 'react'
import { Card, Image, Typography, Button } from 'antd'
import { decodeToken } from '../../utils/jwtDecode'
import { useLogoutMutation } from 'services/AuthApi'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const { Title, Text } = Typography

const UserInfoCard = () => {
    const navigate = useNavigate()
    const [logout] = useLogoutMutation()

    const decodedUser = useMemo(() => {
        const token = Cookies.get('user')
        if (!token) {
            return null
        }
        return decodeToken(token)
    }, [])

    const onLogout = async () => {
        try {
            await logout()
            Cookies.remove('user')
            navigate('/admin/login')
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
