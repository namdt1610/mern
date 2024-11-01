// context/AuthContext.ts
import React, {
    createContext,
    useReducer,
    ReactNode,
    Dispatch,
    PropsWithChildren,
} from 'react'

// Ensure the file is treated as a module with JSX support
export {}

export type User = {
    email: string
    password: string
}

interface State {
    user: User | null
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

    console.log('AuthContext state:', state)

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}
