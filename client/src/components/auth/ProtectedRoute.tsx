import React, { PropsWithChildren } from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { Navigate } from 'react-router-dom'
//* components/auth/ProtectedRoute.tsx

interface DecodedToken {
    role: 'admin' | 'user'
    exp: number
}

interface ProtectedRouteProps {
    requiredRole?: 'admin' | 'user' | 'both' // Quy định quyền hạn
}

const ProtectedRoute: React.FC<PropsWithChildren & ProtectedRouteProps> = ({
    children,
    requiredRole = 'admin',
}) => {
    const token = Cookies.get('user') // Lấy token từ cookie

    if (token) {
        try {
            const decodedToken: DecodedToken = jwtDecode(token)

            // Kiểm tra token còn hiệu lực
            if (decodedToken.exp > Date.now() / 1000) {
                if (
                    requiredRole === 'both' || // Cả admin & user đều được phép
                    requiredRole === decodedToken.role
                ) {
                    return children
                } else {
                    return <Navigate to="/403" /> // Không đủ quyền
                }
            } else {
                return <Navigate to="/admin/login" /> // Token hết hạn
            }
        } catch (error) {
            console.error('Token không hợp lệ:', error)
            return <Navigate to="/admin/login" /> // Token lỗi
        }
    }

    return <Navigate to="/admin/login" /> // Không có token
}

export default ProtectedRoute
