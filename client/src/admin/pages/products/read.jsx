import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ConfirmationModal from '../../components/ConfirmationModal'

const ProductDetailsForm = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [updatedProduct, setUpdatedProduct] = useState({})
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/admin/products/${id}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch product')
                }
                const data = await response.json()
                setProduct(data)
                setUpdatedProduct(data) // Set the initial state for editing
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }   
        fetchProduct()
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setUpdatedProduct((prev) => ({ ...prev, [name]: value }))
    }

    const handleSave = async () => {
        try {
            const response = await fetch(`/api/admin/products/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            })
            if (!response.ok) {
                throw new Error('Failed to update product')
            }
            const data = await response.json()
            setProduct(data)
            setIsEditing(false)
        } catch (error) {
            setError(error.message)
        }
    }

    const handleRemove = async () => {
        try {
            const response = await fetch(`/api/admin/products/${id}`, {
                method: 'DELETE',
            })
            if (!response.ok) {
                throw new Error('Failed to remove product')
            }
            window.location.href = '/admin/products'
        } catch (error) {
            setError(error.message)
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className="product-details">
            <div>
                <a className="btn-secondary" href="/admin/products">
                    Back to Products
                </a>
                {isEditing ? (
                    <>
                        <Button className="btn-success" onClick={handleSave}>
                            Save
                        </Button>
                        <Button
                            className="btn-secondary"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </Button>
                    </>
                ) : (
                    <Button
                        className="btn-warning"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </Button>
                )}
                <Button
                    className="btn-danger"
                    onClick={() => setShowModal(true)}
                >
                    Remove
                </Button>
            </div>
            <h1>{product.name}</h1>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        name="name"
                        value={updatedProduct.name || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="description"
                        value={updatedProduct.description || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="price"
                        value={updatedProduct.price || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="stock"
                        value={updatedProduct.stock || ''}
                        onChange={handleChange}
                    />
                </>
            ) : (
                <>
                    <p>{product.description}</p>
                    <p>Price: {product.price}</p>
                    <p>Stock: {product.stock}</p>
                </>
            )}
            <p>Created: {new Date(product.createdAt).toLocaleString()}</p>
            {product.imageUrl && (
                <img
                    src={`http://localhost:3000${product.imageUrl}`}
                    alt={product.name}
                />
            )}

            <ConfirmationModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleRemove}
                message="Are you sure you want to delete this product?"
            />
        </div>
    )
}

export default ProductDetailsForm
