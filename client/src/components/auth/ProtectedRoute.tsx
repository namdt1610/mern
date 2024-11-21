import React from 'react'
import { Navigate, Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Button, Typography, Space } from 'antd/lib'
import { WarningOutlined } from '@ant-design/icons'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
    role?: string;
    exp?: number;
    [key: string]: any; // Nếu token chứa thêm các trường khác
}

const ProtectedRoute = ({ children }:{ children: JSX.Element }) => {
    // Lấy token từ cookie
    const token = Cookies.get('user')

    // Kiểm tra token có tồn tại và đúng định dạng JWT không
    console.log('Token:', token);

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
