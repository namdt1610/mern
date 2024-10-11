import { createContext, useReducer } from 'react'

const initialState = {
    products: [],
}

export const ProductContext = createContext(initialState)

export const productsReducer = (state, action) => {
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
                product: action.payload,
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

export const ProductContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productsReducer, initialState)

    return (
        <ProductContext.Provider value={{ state, dispatch }}>
            {children}
        </ProductContext.Provider>
    )
}
