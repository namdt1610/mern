import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserRoleFromCookie } from './useGetToken' // Hàm lấy role người dùng, ví dụ từ token
//* utils/withPermission.ts

interface WithPermissionProps {
    requiredRole: 'admin' | 'user' // Quyền truy cập
    children: React.ReactNode
}

const withPermission = (
    WrappedComponent: React.ComponentType<any>,
    requiredRole: 'admin' | 'user'
) => {
    return (props: any) => {
        const userRole = getUserRoleFromCookie() // Lấy role người dùng từ token hoặc Context

        // Kiểm tra quyền truy cập
        if (userRole === requiredRole || requiredRole === 'admin') {
            return React.createElement(WrappedComponent, props)
        }

        const navigate = useNavigate()
        return navigate('/403') // Trả về trang lỗi nếu không có quyền
    }
}

export default withPermission
