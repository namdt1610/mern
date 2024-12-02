// components/ProtectedRoute.tsx
import React, { PropsWithChildren } from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { Navigate } from 'react-router-dom'

interface DecodedToken {
    role: string
    exp: number
}

const ProtectedRoute: React.FC<PropsWithChildren> = ({
    children,
}: {
    children: JSX.Element
}) => {
    const token = Cookies.get('user')
    console.log(token)

    if (token) {
        try {
            const decodedToken: DecodedToken = jwtDecode(token)

            // Kiểm tra nếu token còn hiệu lực và người dùng có quyền admin
            if (
                decodedToken.exp > Date.now() / 1000 &&
                decodedToken.role === 'admin'
            ) {
                return children
            } else {
                return <Navigate to="/403" />
            }
        } catch (error) {
            return <Navigate to="/login" />
        }
    }

    return <Navigate to="/login" />
}

export default ProtectedRoute
