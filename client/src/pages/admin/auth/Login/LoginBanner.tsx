import React from 'react'

const LoginBanner = () => {
    const src = '/videos/auth_banner.mp4'
    return (
        <video className='rounded-3xl' width={500} autoPlay={true} loop muted>
            <source src={src} />
        </video>
    )
}

export default LoginBanner
