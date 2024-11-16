// context/AuthContext.ts
import React, {
    createContext,
    useReducer,
    ReactNode,
    Dispatch,
    PropsWithChildren,
} from 'react'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { User } from '../interfaces/user.interface'

// Ensure the file is treated as a module with JSX support
export {}

interface State {
    user: User
}

interface Action {
    type: 'LOGIN' | 'LOGOUT' | 'REGISTER'
    payload?: User
}

// Tạo context
export const AuthContext = createContext<{
    state: State
    dispatch: Dispatch<Action>
}>({ state: { user: null }, dispatch: () => null })

// Giảm thiểu trạng thái (reducer)
export const authReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

// Định nghĩa props cho provider
interface AuthContextProviderProps {
    children: ReactNode
}

// Tạo provider cho context
export const AuthContextProvider: React.FC<PropsWithChildren<{}>> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    })

    useEffect(() => {
        const user = Cookies.get('user')
        console.log('User from cookies:', user)

        if (user) {
            try {
                const parsedUser = JSON.parse(user)
                dispatch({ type: 'LOGIN', payload: parsedUser }) // Khôi phục người dùng từ cookies
            } catch (error) {
                console.error(
                    'Lỗi khi parse dữ liệu người dùng từ cookie:',
                    error
                )
            }
        }
    }, [])

    useEffect(() => {
        if (state.user) {
            // Lưu thông tin người dùng vào Cookies khi đăng nhập
            Cookies.set('user', JSON.stringify(state.user))
        }
    }, [state.user]) // Chạy lại khi thông tin người dùng thay đổi

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}
