import React from 'react'

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="auth-layout">
            {/* Add any layout-specific styling or components here */}
            {children}
        </div>
    )
}

export default AuthLayout
