import React from 'react'
import { Card } from 'antd/lib'
import LoginForm from './LoginForm'
import LoginBanner from './LoginBanner'
import { useLocation, useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
    const location = useLocation()

    // Lưu trang trước đó vào state
    const from = location.state?.from?.pathname || '/'

    return (
        <Card>
            <div className="flex text-center justify-center">
                <LoginBanner />
                <div className="flex h-[500px] justify-center">
                    <LoginForm from={from} />
                </div>
            </div>
        </Card>
    )
}

export default Login
