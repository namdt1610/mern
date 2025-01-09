import React from 'react'

const RegisterBanner = () => {
    const src = '/videos/auth_banner.mp4'
    return (
        <>
            <video width={700} height={700} autoPlay={true} loop muted>
                <source src={src} />
            </video>
        </>
    )
}

export default RegisterBanner
