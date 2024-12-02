import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Image, Button, Space } from 'antd/'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store' // Điều chỉnh nếu cấu trúc thư mục khác
import useAuthApi from '../../hooks/Auth/useAuthApiBeta'

const UserInfoCard = () => {
    // Lấy thông tin người dùng từ Redux
    const user = useSelector((state: RootState) => state.auth.user)
    const dispatch = useDispatch()
    const { logout } = useAuthApi()

    const onLogout = () => {
        logout({})
        // Sau khi logout, bạn có thể dispatch để cập nhật lại state Redux (nếu cần)
        // dispatch(logoutUser())
    }

    // Kiểm tra nếu user có thông tin đăng nhập hợp lệ
    const isLoggedIn = Boolean(user?._id)

    return (
        <Card className="card-border-color">
            {isLoggedIn ? (
                <div className="flex items-center justify-end">
                    <Space>
                        <h1>Hello, {user.name}</h1>
                        <Image
                            src={
                                user.avatar
                                    ? `http://localhost:8888/${user.avatar}`
                                    : '/img/meerkat.png'
                            }
                            alt={user.name}
                            width={50}
                            className="rounded-full border border-black"
                        />
                        <Button onClick={onLogout}>Logout</Button>
                    </Space>
                </div>
            ) : (
                <div className="flex items-center justify-end">
                    <Link to={'/admin/login'}>
                        <Button className="text-xl" type="link">
                            Login
                        </Button>
                    </Link>
                </div>
            )}
        </Card>
    )
}

export default UserInfoCard
