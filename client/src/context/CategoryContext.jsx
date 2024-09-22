import { createContext, useReducer } from 'react'

export const CategoriesContext = createContext()

export const categoriesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CATEGORIES':
            return {
                categories: action.payload,
            }
        case 'CREATE_CATEGORY':
            return {
                categories: [action.payload, ...state.categories],
            }
        case 'GET_CATEGORY':
            return {
                category: action.payload,
            }
        case 'UPDATE_CATEGORY':
            return {
                categories: state.categories.map((p) =>
                    p._id === action.payload._id ? action.payload : p
                ),
            }
        case 'DELETE_CATEGORY':
            return {
                categories: state.categories.filter(
                    // filter out the category that was deleted
                    (p) => p._id !== action.payload._id
                ),
            }
        default:
            return state
    }
}

export const CategoriesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(categoriesReducer, { categories: [] })

    return (
        <CategoriesContext.Provider value={{ ...state, dispatch }}>
            {children}
        </CategoriesContext.Provider>
    )
}
