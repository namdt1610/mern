// UserInfoCard.tsx
import React, { useMemo } from 'react'
import { Card, Typography, Button, Row, Col, Avatar } from 'antd'
import { decodeToken } from '../../utils/jwtDecode'
import { useLogoutMutation } from 'services/AuthApi'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { AntDesignOutlined } from '@ant-design/icons'

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
            <Row gutter={30} align={'middle'} justify={'center'}>
                <Col>
                    <Avatar
                        size={{
                            xs: 24,
                            sm: 32,
                            md: 40,
                            lg: 64,
                            xl: 80,
                            xxl: 100,
                        }}
                        icon={
                            decodedUser?.avatar ? (
                                decodedUser.avatar
                            ) : (
                                <AntDesignOutlined />
                            )
                        }
                    />
                </Col>
                <Col>
                    <Title level={2}>
                        Welcome, {decodedUser?.name || 'User'}
                    </Title>
                    <Text type="secondary">{decodedUser?.email}</Text>
                    <Text type="secondary">{decodedUser?.role}</Text>
                </Col>
                <Col>
                    <Button onClick={onLogout}>Logout</Button>
                </Col>
            </Row>
        </Card>
    )
}

export default UserInfoCard
