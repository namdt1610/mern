import React from 'react'

interface LoginLayoutProps {
    children: React.ReactNode
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
    return (
        <div className=" w-full h-screen">
            {/* Video background */}
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
            >
                <source src="/videos/bg_loop_abstract.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

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
