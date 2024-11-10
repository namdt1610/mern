// src/components/Auth/ProtectedRoute.tsx

import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    const token = localStorage.getItem('token')
    const isAuthenticated = !!token

    if (isAuthenticated) {
        // Giải mã JWT để lấy thông tin role
        const decodedToken = JSON.parse(atob(token.split('.')[1]))
        const userRole = decodedToken?.role // Giả sử role lưu trong JWT

        // Chỉ cho phép người dùng có role là 'admin' vào trang admin
        if (userRole === 'admin') {
            return children
        }
    }
    
    return <Navigate to="/login" />
}

export default ProtectedRoute
