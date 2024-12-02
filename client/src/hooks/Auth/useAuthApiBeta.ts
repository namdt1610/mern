import { useSelector } from 'react-redux'
// hooks/useAuthApi.ts
import { loginApi, registerApi, logoutApi } from '../../services/auth'
import useApiCall from '../useApiCall'
import { message } from 'antd/'
import { useNavigate } from 'react-router-dom'

const useAuthApi = () => {
    const { state } = useSelector((state: any) => state.auth)
    const navigate = useNavigate()

    const login = useApiCall(
        loginApi,
        (data) => {
            message.loading('Logging in...', 0)
            dispatch({ type: 'LOGIN', payload: data.user })
            setTimeout(() => {
                message.destroy() // Đóng thông báo "Logging in..."
                message.success('Login successful', 1) // Hiển thị thông báo thành công
            }, 1000)

            setTimeout(() => {
                message.loading('Redirecting...', 1) // Thời gian hiển thị 1 giây
                // Sau 1 giây, chuyển hướng đến trang admin
                setTimeout(() => {
                    navigate('/admin')
                    message.success('Welcome to admin page', 1)
                }, 1000)
            }, 2000)
        },
        (error) => {
            message.error(error?.response?.data?.message || 'Login failed')
        }
    )

    const register = useApiCall(
        registerApi,
        (data) => dispatch({ type: 'REGISTER', payload: data.user }),
        (error) => {
            message.error(
                error?.response?.data?.message || 'Registration failed'
            )
        }
    )

    const logout = useApiCall(
        logoutApi,
        () => dispatch({ type: 'LOGOUT' }),
        (error) => {
            message.error(error?.response?.data?.message || 'Logout failed')
        }
    )

    return { login, register, logout }
}

export default useAuthApi
