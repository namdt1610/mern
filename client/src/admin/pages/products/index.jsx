import { useEffect } from 'react'
import { useProductsContext } from '../../../hooks/useProductsContext'

import ProductDetails from '../../components/productDetails'
import ProductForm from '../../components/ProductForm'

const Products = () => {
    const {products, dispatch} = useProductsContext()

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('/api/admin/products')
            const json = await response.json()

            if (response.ok) {
                dispatch({type:'SET_PRODUCTS', payload: json})
            }
        }

        fetchProducts()
    }, [])

    return (
        <div className="product">
            {products &&
                products.map((product) => (
                    <ProductDetails key={product._id} product={product} />
                ))}
            <ProductForm />
        </div>
    )
}

export default Products
