import Cookies from 'js-cookie'
import { loginApi, registerApi, logoutApi } from '../api/authApi'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const useAuthApi = () => {
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()

    // Thêm các state loading và error
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    // Hàm đăng nhập
    const login = async (credentials: {
        email: string
        password: string
    }) => {
        setLoading(true) // Bắt đầu loading
        setError(null) // Xóa lỗi cũ nếu có
        try {
            const data = await loginApi(credentials)
            Cookies.set('dangtrannam', data.token, { expires: 7 })
            dispatch({ type: 'LOGIN', payload: data.user })
            navigate('/') // Thay vì `window.location.href`, sử dụng `navigate` từ react-router-dom
        } catch (error: any) {
            console.error('Error logging in:', error)
            setError('Error logging in, please try again') // Hiển thị lỗi cho người dùng
        } finally {
            setLoading(false) // Dừng loading
        }
    }

    // Hàm đăng ký
    const register = async (credentials: {
        username: string
        password: string
        email: string
    }) => {
        setLoading(true)
        setError(null)
        try {
            const data = await registerApi(credentials)
            dispatch({ type: 'REGISTER', payload: data })
        } catch (error: any) {
            console.error('Error registering:', error)
            setError('Error registering, please try again')
        } finally {
            setLoading(false)
        }
    }

    // Hàm đăng xuất
    const logout = async () => {
        setLoading(true)
        setError(null)
        try {
            await logoutApi()
            Cookies.remove('dangtrannam', { path: '/' })
            dispatch({ type: 'LOGOUT' })
            navigate('/login')
        } catch (error: any) {
            console.error('Error logging out:', error)
            setError('Error logging out, please try again')
        } finally {
            setLoading(false)
        }
    }

    return { login, register, logout, loading, error }
}

export default useAuthApi
