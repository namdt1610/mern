import React from 'react'
import RegisterForm from './RegisterForm'
import RegisterBanner from './RegisterBanner'
import RegisterLayout from './RegisterLayout'
import {useLocation} from 'react-router-dom'
import {Card} from 'antd/lib'

const Register: React.FC = () => {
    const location = useLocation()
    const from = location.state?.from?.pathname || '/admin'

    return (
        <RegisterLayout>
            <Card className="w-full max-w-6xl card-border">
                <div className="flex flex-col md:flex-row items-center justify-center w-full">
                    <div className="w-full md:w-1/2 mb-8 md:mb-0">
                        <RegisterBanner />
                    </div>
                    <div className="w-full md:w-1/2 flex justify-center items-center">
                        <div className="w-full max-w-[450px] px-4">
                            <RegisterForm from={from} />
                        </div>
                    </div>
                </div>
            </Card>
        </RegisterLayout>
    )
}

export default Register
