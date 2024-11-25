import React from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import Error from '../../admin/pages/result/403'

interface DecodedToken {
    role?: string
    exp?: number
    [key: string]: any // Nếu token chứa thêm các trường khác
}

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    // Lấy token từ cookie
    const token = Cookies.get('user')

    // Kiểm tra token có tồn tại và đúng định dạng JWT không
    console.log('Token:', token)

    if (token) {
        try {
            const decodedToken = jwtDecode<DecodedToken>(token)
            if (decodedToken?.role === 'admin') {
                return children
            }
        } catch (error) {
            console.error('Invalid token:', error)
        }
    }

    // Nếu không hợp lệ, chuyển hướng về trang login
    return (
        <div className="text-center justify-center">
            <Error />
        </div>
    )
}

export default ProtectedRoute
