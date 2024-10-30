// src/components/Auth/ProtectedRoute.tsx

import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    const isAuthenticated = !!localStorage.getItem('token')
    return isAuthenticated ? children : <Navigate to="/login" />
}

export default ProtectedRoute
