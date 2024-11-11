import React from 'react'
import { Navigate, Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Button, Typography, Space } from 'antd/lib'
import { WarningOutlined } from '@ant-design/icons'

const ProtectedRoute = ({ children }) => {
    // Lấy token từ cookie
    const token = Cookies.get('user')

    // Kiểm tra token có tồn tại và đúng định dạng JWT không
    if (token && token.split('.').length === 3) {
        try {
            // Giải mã JWT để lấy thông tin role
            const decodedToken = JSON.parse(atob(token.split('.')[1]))
            const userRole = decodedToken?.role // Giả sử role lưu trong JWT

            // Chỉ cho phép người dùng có role là 'admin' vào trang admin
            if (userRole === 'admin') {
                return children
            }
        } catch (error) {
            console.error('Lỗi giải mã token:', error)
        }
    }

    // Nếu không hợp lệ, chuyển hướng về trang login
    return (
        <div className='text-center justify-center'>
            <Space align="center" direction="vertical">
                <Typography.Title level={2}>403</Typography.Title>
                <WarningOutlined style={{ fontSize: '2rem', color: 'red' }} />
                <p>Bạn phải là quản trị viên mới được quyền truy cập !!!</p>
                <Link to={'/admin/login'}>
                    <Button type="primary">Quay về đăng nhập</Button>
                </Link>
            </Space>
        </div>
    )
}

export default ProtectedRoute
