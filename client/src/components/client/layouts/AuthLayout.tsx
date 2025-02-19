import React from 'react'
import BackgroundVideo from '@/components/shared/BackgroundVideo'

interface LoginLayoutProps {
    children: React.ReactNode
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
    return (
        <div className="w-full h-screen">
            {/* Video background */}
            <BackgroundVideo />
            {/* <div className="fixed w-screen h-screen -z-10">
                <img className="w-screen h-screen object-cover" src="/img/blue-cloud.jpg" alt="" />
            </div> */}
            {/* Gradient overlay */}
            {/* <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50" /> */}

            {/* Centered Content */}
            <div className="flex items-center justify-center w-full h-full z-10">
                {children}
            </div>
        </div>
    )
}

export default LoginLayout
