import React, { useEffect } from 'react'
import ProductDetails from './ProductDetails'
import { fetchProductById } from '../../../hook/useProductActions'

const ProductContainer = () => {
    useEffect(() => {
        id = window.location.pathname.split('/')[1]
        fetchProductById(id)
    }, [])

    return <ProductDetails />
}

export default ProductContainer
