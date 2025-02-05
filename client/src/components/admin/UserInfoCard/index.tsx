// UserInfoCard.tsx
import React, { useMemo } from 'react'
import { Avatar, Button, Typography, Card } from 'antd'
import { decodeToken } from '@/utils/jwtDecode'
import { useLogoutMutation } from '@/services/AuthApi'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { AntDesignOutlined } from '@ant-design/icons'
import styles from './UserInfoCard.module.scss' // Assuming CSS module

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
        <Card
            className={styles.userCard}
            bordered={false}
            hoverable
            cover={
                <Avatar
                    className={styles.avatar}
                    size={100}
                    icon={
                        decodedUser?.avatar ? (
                            <img src={decodedUser.avatar} alt="User Avatar" />
                        ) : (
                            <AntDesignOutlined />
                        )
                    }
                />
            }
        >
            <div className={styles.userInfo}>
                <Title level={4} className={styles.welcome}>
                    {decodedUser
                        ? `Welcome, ${decodedUser.name}`
                        : 'You are not logged in'}
                </Title>
                {decodedUser && (
                    <>
                        <Text className={styles.email}>
                            {decodedUser.email}
                        </Text>
                        <Text className={styles.role}>{decodedUser.role}</Text>
                    </>
                )}
            </div>
            {!decodedUser && (
                <Button
                    className={styles.loginButton}
                    size="large"
                    onClick={() => navigate('/admin/login')}
                    type="primary"
                    block
                >
                    Login
                </Button>
            )}
            {decodedUser && (
                <Button
                    className={styles.logoutButton}
                    size="large"
                    onClick={onLogout}
                    danger
                    block
                >
                    Logout
                </Button>
            )}
        </Card>
    )
}

export default UserInfoCard
