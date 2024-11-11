import { loginApi, registerApi, logoutApi } from '../api/authApi'
import { useAuthContext } from './useAuthContext'
import { useState } from 'react'

const useAuthApi = () => {
    const { dispatch } = useAuthContext()

    const [isLoading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    // Call API and dispatch action
    const login = async (credentials: { email: string; password: string }) => {
        setLoading(true)
        setError(null)
        try {
            console.log('Credentials:', credentials)
            const data = await loginApi(credentials)
            dispatch({ type: 'LOGIN', payload: data.user })
        } catch (error: any) {
            console.error('Error logging in:', error)
            setError('Error logging in, please try again')
        } finally {
            setLoading(false)
        }
    }

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

    const logout = async () => {
        setLoading(true)
        setError(null)
        try {
            await logoutApi()
            dispatch({ type: 'LOGOUT' })
        } catch (error: any) {
            console.error('Error logging out:', error)
            setError('Error logging out, please try again')
        } finally {
            setLoading(false)
        }
    }

    return { login, register, logout, isLoading, error }
}

export default useAuthApi
