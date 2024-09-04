import { useProductsContext } from '../../hooks/useProductsContext'
import ImagePreview from './ImagePreview'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ConfirmationModal from './ConfirmationModal'

const ProductDetails = ({ product }) => {
    const { dispatch } = useProductsContext()
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)

    const handleRemove = async () => {
        const respone = await fetch(`/api/admin/products/` + product._id, {
            method: 'DELETE',
        })
        const json = await respone.json()
        if (respone.ok) {
            dispatch({ type: 'DELETE_PRODUCT', payload: json })
        }
    }

    const handleDetails = async () => {
        navigate(`/admin/products/${product._id}`)
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
                        <button
                            className="btn-warning mb-2"
                            onClick={handleDetails}
                        >
                            Details
                        </button>
                        <Button
                            className="btn-danger"
                            onClick={() => setShowModal(true)}
                        >
                            Remove
                        </Button>

                        <ConfirmationModal
                            show={showModal}
                            onClose={() => setShowModal(false)}
                            onConfirm={handleRemove}
                            message="Are you sure you want to delete this product?"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetails
