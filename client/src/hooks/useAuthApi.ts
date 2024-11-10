import Cookies from 'js-cookie'
import { loginApi, registerApi, logoutApi } from '../api/authApi'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const useAuthApi = () => {
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    // API login
    const login = async (credentials: { email: string; password: string }) => {
        setLoading(true)
        setError(null)
        try {
            console.log('Credentials:', credentials)
            const data = await loginApi(credentials)
            dispatch({ type: 'LOGIN', payload: data.user })
            navigate('/')
        } catch (error: any) {
            console.error('Error logging in:', error)
            setError('Error logging in, please try again')
        } finally {
            setLoading(false)
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
