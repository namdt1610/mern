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

    // Actions
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

    // Handle
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
                        <button className="btn-success" onClick={handleSave}>
                            Save
                        </button>
                        <button
                            className="btn-secondary"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <button
                        className="btn-warning"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </button>
                )}
                <button
                    className="btn-danger"
                    onClick={() => setShowModal(true)}
                >
                    Remove
                </button>
            </div>
            <div className="main flex">
                <div className="left-col w-1/2">
                    {isEditing ? (
                        <>
                            <form>
                                <div class="mb-6">
                                    <label
                                        for="text"
                                        class="block mb-2 text-sm font-medium text-white-900 dark:text-white"
                                    >
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        class="bg-white-50 border border-white-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder={product.name}
                                        required
                                    />
                                </div>
                                <div class="grid gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                        <label
                                            for="category"
                                            class="block mb-2 text-sm font-medium text-white-900 dark:text-white"
                                        >
                                            Category
                                        </label>
                                        <input
                                            type="text"
                                            id="category"
                                            class="bg-white-50 border border-white-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder={product.category}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="stock"
                                            class="block mb-2 text-sm font-medium text-white-900 dark:text-white"
                                        >
                                            Stock
                                        </label>
                                        <input
                                            type="number"
                                            id="stock"
                                            class="bg-white-50 border border-white-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder={product.stock}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="price"
                                            class="block mb-2 text-sm font-medium text-white-900 dark:text-white"
                                        >
                                            Price
                                        </label>
                                        <input
                                            type="number"
                                            id="price"
                                            class="bg-white-50 border border-white-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder={product.price}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="stock"
                                            class="block mb-2 text-sm font-medium text-white-900 dark:text-white"
                                        >
                                            Stock
                                        </label>
                                        <input
                                            type="number"
                                            id="stock"
                                            class="bg-white-50 border border-white-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder={product.stock}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="visitors"
                                            class="block mb-2 text-sm font-medium text-white-900 dark:text-white"
                                        >
                                            Unique visitors (per month)
                                        </label>
                                        <input
                                            type="number"
                                            id="visitors"
                                            class="bg-white-50 border border-white-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder=""
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Submit
                                </button>
                            </form>

                            <input
                                type="text"
                                name="name"
                                value={updatedProduct.name || ''}
                                onChange={handleChange}
                                className="mb-2"
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
                            <h1 className="py-1 text-2xl">
                                Name: {product.name}
                            </h1>
                            <p className="py-1">
                                Description: {product.description}
                            </p>
                            <p className="py-1">Price: {product.price}</p>
                            <p className="py-1">Stock: {product.stock}</p>
                            <p className="py-1">
                                Created:{' '}
                                {new Date(product.createdAt).toLocaleString()}
                            </p>
                        </>
                    )}
                </div>
                <div className="right-col flex justify-center items-center">
                    {product.imageUrl && (
                        <img
                            className="w-1/2 h-auto object-cover rounded-2xl"
                            src={`http://localhost:8888${product.imageUrl}`}
                            alt={product.name}
                        />
                    )}
                </div>
            </div>

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
