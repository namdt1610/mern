import React, { createContext, useReducer, ReactNode, Dispatch } from 'react'
import { Category } from '../interfaces/Category'

export interface State {
    categories: Category[]
}

export interface Action {
    type:
        | 'SET_CATEGORIES'
        | 'CREATE_CATEGORY'
        | 'GET_CATEGORY'
        | 'UPDATE_CATEGORY'
        | 'DELETE_CATEGORY'
    payload: any
}

const initialState: State = {
    categories: [],
}

export const CategoryContext = createContext<{
    state: State
    dispatch: Dispatch<Action>
}>({
    state: initialState,
    dispatch: () => null,
})

export const categoryReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_CATEGORIES':
            return {
                ...state,
                categories: action.payload,
            }
        case 'CREATE_CATEGORY':
            return {
                ...state,
                categories: [action.payload, ...state.categories],
            }
        case 'GET_CATEGORY':
            return {
                ...state,
                categories: action.payload,
            }
        case 'UPDATE_CATEGORY':
            return {
                ...state,
                categories: state.categories.map((c) =>
                    c._id === action.payload._id ? action.payload : c
                ),
            }
        case 'DELETE_CATEGORY':
            return {
                ...state,
                categories: state.categories.filter((c) => c._id !== action.payload._id),
            }
        default:
            return state
    }
}

interface CategoryContextProviderProps {
    children: ReactNode
}

export const CategoryContextProvider: React.FC<CategoryContextProviderProps> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(categoryReducer, initialState)

    return (
        <CategoryContext.Provider value={{ state, dispatch }}>
            {children}
        </CategoryContext.Provider>
    )
}