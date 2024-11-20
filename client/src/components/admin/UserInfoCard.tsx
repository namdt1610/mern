import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Card, Image, Button, Space } from 'antd/lib'
import { AuthContext } from '../../contexts/AuthContext'
import { isLogin } from '../../admin/utils/isLogin'
import useAuthApi from '../../hooks/Auth/useAuthApiBeta'

const UserInfoCard = () => {
    const { state } = useContext(AuthContext)
    const user = state.user
    const { logout } = useAuthApi()
    const onLogout = () => {
        logout({})
    }
    console.log('User:', user)
    return (
        <Card className="card-border-color">
            {isLogin() ? (
                <div className="flex items-center justify-end">
                    <Space>
                        <h1>Hello, {user.name}</h1>
                        <Image
                            src={
                                user.avatar
                                    ? `http://localhost:8888/${user.avatar}`
                                    : '/img/meerkat.png'
                            }
                            alt={user.name}
                            width={50}
                            className="rounded-full border border-black"
                        />
                        <Button onClick={onLogout}>Logout</Button>
                    </Space>
                </div>
            ) : (
                <div className="flex items-center justify-end">
                    <Space>
                        <p className="text-xl">
                            Login to see your profile information
                        </p>
                        <Link to={'/admin/login'}>
                            <Button className="text-xl" type="link">
                                Login
                            </Button>
                        </Link>
                    </Space>
                </div>
            )}
        </Card>
    )
}

export default UserInfoCard
