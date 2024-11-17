// hooks/useAuthApi.ts
import { loginApi, registerApi, logoutApi } from '../../api/authApi'
import useApiCall from '../useApiCall'
import { useAuthContext } from './useAuthContext'

const useAuthApi = () => {
    const { dispatch } = useAuthContext()

    // Gọi login API và dispatch kết quả vào context
    const login = useApiCall(loginApi, (data) =>
        dispatch({ type: 'LOGIN', payload: data.user })
    )

    // Gọi register API và dispatch kết quả vào context
    const register = useApiCall(registerApi, (data) =>
        dispatch({ type: 'REGISTER', payload: data.user })
    )

    // Gọi logout API và dispatch kết quả vào context
    const logout = useApiCall(logoutApi, () => dispatch({ type: 'LOGOUT' }))

    return { login, register, logout }
}

export default useAuthApi
