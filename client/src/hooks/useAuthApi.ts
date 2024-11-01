// hooks/useAuthApi.ts
import Cookies from 'js-cookie'
import { loginApi, registerApi, logoutApi } from '../api/authApi'
import { useAuthContext } from './useAuthContext'

const useAuthApi = () => {
    const { dispatch } = useAuthContext()

    const login = async (credentials: {
        username: string
        password: string
    }) => {
        try {
            const data = await loginApi(credentials)
            Cookies.set('authToken', data.token, { expires: 7 })
            dispatch({ type: 'LOGIN', payload: data.user })
            // window.location.href = '/'
        } catch (error) {
            console.error('Error logging in:', error)
        }
    }

    const register = async (credentials: {
        username: string
        password: string
        email: string
    }) => {
        try {
            const data = await registerApi(credentials)
            dispatch({ type: 'REGISTER', payload: data })
        } catch (error) {
            console.error('Error registering:', error)
        }
    }

    const logout = async () => {
        try {
            await logoutApi()
            Cookies.remove('authToken')
            dispatch({ type: 'LOGOUT' })
        } catch (error) {
            console.error('Error logging out:', error)
        }
    }

    return { login, register, logout }
}

export default useAuthApi
