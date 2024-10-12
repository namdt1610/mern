import React, { useContext, useEffect } from 'react'
import ProductDetails from './ProductDetails'
import { fetchProductById } from '../../../hook/useProductActions'
import { ProductContext } from '../../../context/ProductContext'

const ProductContainer = () => {
    const { state, dispatch } = useContext(ProductContext)

    useEffect(() => {
        let id = window.location.pathname.split('/')[1]
        fetchProductById(id, dispatch)
    }, [dispatch])

    // console.log(state.product)

    return <ProductDetails p={state.product} />
}

export default ProductContainer
