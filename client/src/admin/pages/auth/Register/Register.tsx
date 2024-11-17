import React from 'react'
import RegisterForm from './RegisterForm'
import RegisterBanner from '../Register/RegisterBanner'
import { useLocation } from 'react-router-dom'

const Register: React.FC = () => {
    const location = useLocation()
    const from = location.state?.from?.pathname || '/admin'

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl">
                <div className="w-full md:w-1/2 mb-8 md:mb-0">
                    <RegisterBanner />
                </div>
                <div className="w-full md:w-1/2 flex justify-center items-center">
                    <div className="w-full max-w-[450px] px-4">
                        <RegisterForm from={from} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
