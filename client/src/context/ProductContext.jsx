import { createContext } from 'react'

export const ProductsContext = createContext()

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
        case 'DELETE_PRODUCT':
            return {
                products: state.products.filter( // filter out the product that was deleted
                    (p) => p._id !== action.payload._id
                ),
            }
        default:
            return state
    }
}

export const ProductsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, { products: null })

    return (
        <WorkoutContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutContext.Provider>
    )
}
