// hooks/useAuthContext.ts
import { AuthContext, User } from '../context/AuthContext'
import { useContext } from 'react'

interface AuthContextType {
    state: {
        user: User | null
    }
    dispatch: React.Dispatch<{ type: string; payload?: any }>
}

export function useAuthContext(): AuthContextType {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error(
            'useAuthContext must be used within an AuthContextProvider'
        )
    }

    return context
}
