import React, { createContext, useReducer, ReactNode, Dispatch } from 'react'
import { Product } from '../interfaces/Product'

export interface State {
    products: Product[]
}

export interface Action {
    type:
        | 'SET_PRODUCTS'
        | 'CREATE_PRODUCT'
        | 'GET_PRODUCT'
        | 'UPDATE_PRODUCT'
        | 'DELETE_PRODUCT'
    payload: any
}

const initialState: State = {
    products: [],
}

export const ProductContext = createContext<{
    state: State
    dispatch: Dispatch<Action>
}>({
    state: initialState,
    dispatch: () => null,
})

export const productReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.payload,
            }
        case 'CREATE_PRODUCT':
            return {
                ...state,
                products: [action.payload, ...state.products],
            }
        case 'GET_PRODUCT':
            return {
                ...state,
                products: action.payload,
            }
        case 'UPDATE_PRODUCT':
            return {
                ...state,
                products: state.products.map((p) =>
                    p._id === action.payload._id ? action.payload : p
                ),
            }
        case 'DELETE_PRODUCT':
            return {
                ...state,
                products: state.products.filter(
                    (p) => p._id !== action.payload._id
                ),
            }
        default:
            return state
    }
}

interface ProductContextProviderProps {
    children: ReactNode
}

export const ProductContextProvider: React.FC<ProductContextProviderProps> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(productReducer, initialState)

    return (
        <ProductContext.Provider value={{ state, dispatch }}>
            {children}
        </ProductContext.Provider>
    )
}
