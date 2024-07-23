import { useProductsContext } from '../../hooks/useProductsContext'
import ImagePreview from './ImagePreview'
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
        <>
            <div className="product-details flex h-auto shadow rounded-2xl">
                <div className="image-section w-96 h-auto m-2">
                    <ImagePreview
                        url={`http://localhost:3000${product.imageUrl}`}
                    />
                </div>
                <div className="body-section m-4 flex items-center">
                    <div className="w-96">
                        <h1>{product.name}</h1>
                        <p>{product.description}</p>
                        <p>Price: {product.price}</p>
                        <p>Stock: {product.stock}</p>
                        <p>
                            Created:{' '}
                            {formatDistanceToNow(new Date(product.createdAt))}{' '}
                            ago
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <button className="btn-warning mb-2">Edit</button>
                        <button className="btn-danger" onClick={handleClick}>
                            Delele
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}