import React from 'react'
import { useLocation } from 'react-router-dom'
import { Card } from 'antd/lib'
import LoginForm from './LoginForm'
import LoginBanner from './LoginBanner'
import LoginLayout from './LoginLayout'

const Login: React.FC = () => {
    const location = useLocation()
    const from = location.state?.from?.pathname || '/admin'

    return (
        <LoginLayout>
                <Card className="w-full max-w-6xl card-border">
                    <div className="flex flex-col md:flex-row items-center justify-center w-full">
                        <div className="w-full md:w-1/2 mb-8 md:mb-0">
                            <LoginBanner />
                        </div>
                        <div className="w-full md:w-1/2 flex justify-center items-center">
                            <div className="w-full max-w-[450px] px-4">
                                <LoginForm from={from} />
                            </div>
                        </div>
                    </div>
                </Card>
        </LoginLayout>
    )
}

export default Login
