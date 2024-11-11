import { loginApi, registerApi, logoutApi } from '../api/authApi'
import { useAuthContext } from './useAuthContext'
import useApiCall from './useApiCall'

const useAuthApi = () => {
    const { dispatch } = useAuthContext()

    const login = async (credentials: { email: string; password: string }) => {
        const { callApi, isLoading, error } = useApiCall(
            (params) => loginApi(params),
            (data) => ({ type: 'LOGIN', payload: data.user }),
            'Error logging in, please try again'
        )

        const data = await callApi(credentials)

        if (data) {
            dispatch({ type: 'LOGIN', payload: data.user })
        }

        return { isLoading, error }
    }

    const register = async (credentials: {
        username: string
        password: string
        email: string
    }) => {
        const { callApi, isLoading, error } = useApiCall(
            (params) => registerApi(params),
            (data) => ({ type: 'REGISTER', payload: data }),
            'Error registering, please try again'
        )

        const data = await callApi(credentials)

        if (data) {
            dispatch({ type: 'REGISTER', payload: data })
        }

        return { isLoading, error }
    }

    const logout = async () => {
        const { callApi, isLoading, error } = useApiCall(
            logoutApi,
            () => ({ type: 'LOGOUT' }),
            'Error logging out, please try again'
        )

        const data = await callApi()

        if (data) {
            dispatch({ type: 'LOGOUT' })
        }

        return { isLoading, error }
    }

    return { login, register, logout,  }
}

export default useAuthApi
