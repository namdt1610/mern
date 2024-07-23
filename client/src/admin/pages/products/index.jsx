import { useEffect } from 'react'
import { useProductsContext } from '../../../hooks/useProductsContext'

import ProductDetails from '../../components/ProductDetails'

const Products = () => {
    const { products, dispatch } = useProductsContext()

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('/api/admin/products')
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_PRODUCTS', payload: json })
            }
        }

        fetchProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="product">
            {products &&
                products.map((product) => (
                    <ProductDetails key={product._id} product={product} />
                ))}
        </div>
    )
}

export default Products
