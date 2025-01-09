import React from 'react'

interface RegisterLayoutProps {
    children: React.ReactNode
}

const RegisterLayout: React.FC<RegisterLayoutProps> = ({ children }) => {
    return (
        <div className="relative w-full h-screen">
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
            <div className="flex items-center justify-center w-full h-full relative z-10">
                {children}
            </div>
        </div>
    )
}

export default RegisterLayout
