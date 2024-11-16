import { ProductContext } from '../../contexts/ProductContext'
import { useContext } from 'react'

export const useProductContext = () => {
    const context = useContext(ProductContext)

    if (!context) {
        throw new Error(
            'useProductsContext must be used inside an ProductsContextProvider'
        )
    }

    return context
}
