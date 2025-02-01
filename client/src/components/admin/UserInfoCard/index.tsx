// UserInfoCard.tsx
import React, { useMemo } from 'react'
import { Avatar, Button, Typography } from 'antd'
import { decodeToken } from '@/utils/jwtDecode'
import { useLogoutMutation } from '@/services/AuthApi'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { AntDesignOutlined } from '@ant-design/icons'
import styles from './UserInfoCard.module.scss'

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
    // console.log(decodedUser);

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
        <div className={styles.userCard}>
            <Avatar
                className={styles.avatar}
                size={{
                    xs: 32,
                    sm: 40,
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
            <div className={styles.userInfo}>
                <Text className={styles.welcome}>
                    {(decodedUser && 'Welcome, ' + decodedUser.name) ||
                        'You are not logged in'}
                </Text>
                <Text className={styles.email}>{decodedUser?.email}</Text>
                <Text className={styles.role}>{decodedUser?.role}</Text>
            </div>
            <Button
                className={styles.loginButton}
                size="large"
                onClick={() => navigate('/admin/login')}
            >
                Login
            </Button>
        </div>
    )
}

export default UserInfoCard
