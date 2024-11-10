import React from 'react'
import { Card } from 'antd/lib'
import LoginForm from './Login.Form'
import LoginBanner from './Login.Banner'

const Login: React.FC = () => {
    return (
        <Card>
            <div className="flex text-center justify-center">
                <LoginBanner />
                <div className="flex h-[500px] justify-center">
                    <LoginForm />
                </div>
            </div>
        </Card>
    )
}

export default Login
