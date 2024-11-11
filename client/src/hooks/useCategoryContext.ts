import { CategoryContext } from '../contexts/CategoryContext'
import { useContext } from 'react'

export const useCategoryContext = () => {
    const context = useContext(CategoryContext)

    if (!context) {
        throw new Error(
            'useCategoriesContext must be used inside an CategoriesContextProvider'
        )
    }

    return context
}
