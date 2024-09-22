import { CategoriesContext } from '../context/ProductContext'
import { useContext } from 'react'

export const useCategoriesContext = () => {
    const context = useContext(CategoriesContext)

    if (!context) {
        throw new Error(
            'useCategoriesContext must be used inside an CategoriesContextProvider'
        )
    }

    return context
}
