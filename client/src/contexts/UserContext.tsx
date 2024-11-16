import React, { createContext, useReducer, ReactNode, Dispatch } from 'react'
import { User } from '../interfaces/User'

export interface State {
    users: User[]
}

export interface Action {
    type:
        | 'SET_USERS'
        | 'CREATE_USER'
        | 'GET_USER'
        | 'UPDATE_USER'
        | 'DELETE_USER'
    payload: any
}

const initialState: State = {
    users: [],
}

export const UserContext = createContext<{
    state: State
    dispatch: Dispatch<Action>
}>({
    state: initialState,
    dispatch: () => null,
})

export const userReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_USERS':
            return {
                ...state,
                users: action.payload,
            }
        case 'CREATE_USER':
            return {
                ...state,
                users: [action.payload, ...state.users],
            }
        case 'GET_USER':
            return {
                ...state,
                users: action.payload,
            }
        case 'UPDATE_USER':
            return {
                ...state,
                users: state.users.map((u) =>
                    u._id === action.payload._id ? action.payload : u
                ),
            }
        case 'DELETE_USER':
            return {
                ...state,
                users: state.users.filter((u) => u._id !== action.payload._id),
            }
        default:
            return state
    }
}

interface UserContextProviderProps {
    children: ReactNode
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(userReducer, initialState)

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    )
}
