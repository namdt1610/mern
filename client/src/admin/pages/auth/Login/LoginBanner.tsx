import React from 'react'

const LoginBanner = () => {
    const src = '/videos/auth_banner.mp4'
    return (
        <video width={500} autoPlay={true} loop muted>
            <source src={src} />
        </video>
    )
}

export default LoginBanner
