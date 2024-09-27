import { createContext, useReducer } from 'react'

export const ProductContext = createContext()

export const productsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {
                products: action.payload,
            }
        case 'CREATE_PRODUCT':
            return {
                products: [action.payload, ...state.products],
            }
        case 'GET_PRODUCT':
            return {
                product: action.payload,
            }
        case 'UPDATE_PRODUCT':
            return {
                products: state.products.map((p) =>
                    p._id === action.payload._id ? action.payload : p
                ),
            }
        case 'DELETE_PRODUCT':
            return {
                products: state.products.filter(
                    // filter out the product that was deleted
                    (p) => p._id !== action.payload._id
                ),
            }
        default:
            return state
    }
}

export const ProductContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productsReducer, { products: [] })

    return (
        <ProductContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ProductContext.Provider>
    )
}
