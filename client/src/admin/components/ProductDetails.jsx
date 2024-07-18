import { useProductsContext } from '../../hooks/useProductsContext'

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ProductDetails = ({ product }) => {
    const { dispatch } = useProductsContext()

    const handleClick = async () => {
        const respone = await fetch(`/api/products/` + product._id, {
            method: 'DELETE',
        })
        const json = await respone.json()

        if (respone.ok) {
            dispatch({ type: 'DELETE_PRODUCT', payload: json })
        }
    }

    return (
        <div className="product-details">
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <p>Stock: {product.stock}</p>
            <p>Created: {formatDistanceToNow(new Date(product.createdAt))} ago</p>
        </div>
    )
}

export default ProductDetails
