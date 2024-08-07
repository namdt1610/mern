import { ProductsContext } from '../context/ProductContext'
import { useContext } from 'react'

export const useProductsContext = () => {
    const context = useContext(ProductsContext)

    if (!context) {
        throw new Error(
            'useProductsContext must be used inside an ProductsContextProvider'
        )
    }

    return context
}
