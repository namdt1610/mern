import React, {
    createContext,
    useReducer,
    ReactNode,
    Dispatch,
    PropsWithChildren,
} from 'react'
import { Product } from '../interfaces/Product'

export {}

export interface State {
    products: Product[] | null
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

export const ProductContext = createContext<{
    state: State
    dispatch: Dispatch<Action>
}>({
    state: { products: null },
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
                products: state.products
                    ? [action.payload, ...state.products]
                    : [action.payload],
            }
        case 'GET_PRODUCT':
            return {
                ...state,
                products: action.payload,
            }
        case 'UPDATE_PRODUCT':
            return {
                ...state,
                products:
                    state.products?.map((p) =>
                        p._id === action.payload._id ? action.payload : p
                    ) || null,
            }
        case 'DELETE_PRODUCT':
            return {
                ...state,
                products:
                    state.products?.filter(
                        (p) => p._id !== action.payload._id
                    ) || null,
            }
        default:
            return state
    }
}

export const ProductContextProvider: React.FC<PropsWithChildren<{}>> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(productReducer, {
        products: null,
    })

    return (
        <ProductContext.Provider value={{ state, dispatch }}>
            {children}
        </ProductContext.Provider>
    )
}
