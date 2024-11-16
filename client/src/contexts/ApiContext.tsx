// context/ApiContext.tsx
import React, { createContext, useReducer, useContext, ReactNode } from 'react'

interface ApiState {
    loading: boolean
    error: string | null
}

const initialState: ApiState = {
    loading: false,
    error: null,
}

const ApiContext = createContext<any>(null)

const apiReducer = (state: ApiState, action: any): ApiState => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: action.payload }
        case 'SET_ERROR':
            return { ...state, error: action.payload }
        default:
            return state
    }
}

export const ApiProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(apiReducer, initialState)

    return (
        <ApiContext.Provider value={{ state, dispatch }}>
            {children}
        </ApiContext.Provider>
    )
}

export const useApiContext = () => {
    const context = useContext(ApiContext)
    if (!context)
        throw new Error('useApiContext must be used within an ApiProvider')
    return context
}
