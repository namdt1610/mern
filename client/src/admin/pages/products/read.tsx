import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
// import getCategoryNameById from '../../utils/category'
import ConfirmationModal from '../../../components/ConfirmationModal'
import { useParams, Link } from 'react-router-dom'
import { ProductContext } from '../../../context/ProductContext'
import { CategoryContext } from '../../../context/CategoryContext'
import { Skeleton, Stack } from '@mui/material'

const ProductDetailsForm = () => {
    const { id } = useParams() // Get the product ID from the URL
    const { dispatch } = useContext(ProductContext) // Get the dispatch function from the context
    const { dispatch: dispatchCategory, categories } =
        useContext(CategoryContext) // Get the dispatch function from the context
    // Define the Product interface
    interface Product {
        name: string
        category: string | string[] // Allow category to be a string or an array of strings
        description: string
        price: number
        stock: number
        createdAt: string
        imageUrl?: string
    }

    interface Category {
        _id: string
        name: string
    }

    // State variables
    const [product, setProduct] = useState<Product | null>(null)
    const [category, setCategory] = useState<Category[]>([])
    const [isEditing, setIsEditing] = useState(false)
    const [updatedProduct, setUpdatedProduct] = useState<Partial<Product>>({})
    const [showModal, setShowModal] = useState(false)

    const apiUrl = `/api/admin/products/${id}`
    const apiUrlCategory = `/api/admin/categories/`

    // Fetch product details when component mounts or id changes
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(apiUrl)
                const responseCategory = await axios.get(apiUrlCategory)
                const dataCategory = responseCategory.data
                const data = response.data
                dispatch({ type: 'GET_PRODUCT', payload: data })

                dispatchCategory({
                    type: 'SET_CATEGORY',
                    payload: dataCategory.categories,
                })
                console.log(dataCategory)
                console.log(data)
                setProduct(data)
                setUpdatedProduct(data)
                setCategory(dataCategory.categories)
            } catch (error) {
                console.error(`Failed to fetch product: ${error.message}`)
            }
        }
        fetchProduct()
    }, [id, apiUrl, dispatch])

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target
        setUpdatedProduct((prev) => ({ ...prev, [name]: value }))
    }

    // Save updated product details
    const handleSave = async () => {
        if (
            !updatedProduct.name ||
            !updatedProduct.category ||
            !updatedProduct.price
            //!updatedProduct.stock
        ) {
            console.error('Please fill in all required fields')
            return
        }

        try {
            const response = await axios.patch(apiUrl, updatedProduct, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = response.data
            setProduct(data)
            setIsEditing(false)
        } catch (error) {
            console.error('Error updating product:', error.message)
        }
    }

    // Remove product
    const handleRemove = async () => {
        try {
            const response = await axios.delete(apiUrl)
            if (response.status !== 200) {
                throw new Error('Failed to remove product')
            }
            window.location.href = '/admin/products'
        } catch (error) {
            console.error(error.message)
        }
    }

    // Show loading skeleton if product is not yet loaded
    if (!product) {
        return (
            <div>
                <Stack spacing={1}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="rounded" width={500} height={60} />
                    <Skeleton variant="rounded" width={500} height={60} />
                    <Skeleton variant="rounded" width={500} height={60} />
                    <Skeleton variant="rounded" width={500} height={60} />
                </Stack>
            </div>
        )
    }

    const getCategoryNameById = (id: string) => {
        const categoryFound = category.find((cat) => cat._id === id)
        return categoryFound ? categoryFound.name : 'Unknown Category'
    }

    return (
        <div>
            <div>
                <Link to={'/admin/products'}>Back to Products</Link>
                {isEditing ? (
                    <>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={() => setIsEditing(false)}>
                            Cancel
                        </button>
                    </>
                ) : (
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                )}
                <button onClick={() => setShowModal(true)}>Remove</button>
            </div>
            <div>
                <div>
                    {isEditing ? (
                        <form>
                            <div>
                                <label>Product Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={updatedProduct.name || ''}
                                    onChange={handleChange}
                                    placeholder={product.name}
                                    required
                                />
                            </div>
                            <div>
                                <div>
                                    <label>Category</label>
                                    <select
                                        name="category"
                                        value={updatedProduct.category || ''}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled>
                                            Select a category
                                        </option>
                                        {category && category.length > 0 ? (
                                            category.map((cat) => (
                                                <option
                                                    key={cat._id}
                                                    value={cat._id}
                                                >
                                                    {cat.name}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="">
                                                No categories available
                                            </option>
                                        )}
                                    </select>
                                </div>
                                <div>
                                    <label>Stock</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={updatedProduct.stock || ''}
                                        onChange={handleChange}
                                        placeholder={(
                                            product.stock ?? ''
                                        ).toString()}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={updatedProduct.price || ''}
                                        onChange={handleChange}
                                        placeholder={
                                            product.price.toString() || ''
                                        }
                                        required
                                    />
                                </div>
                            </div>
                        </form>
                    ) : (
                        <>
                            <h1>Name: {product.name}</h1>
                            <p>
                                Category:{' '}
                                {getCategoryNameById(
                                    product.category as string
                                )}
                            </p>
                            <p>Description: {product.description}</p>
                            <p>Price: {product.price}</p>
                            <p>Stock: {product.stock}</p>
                            <p>
                                Created:{' '}
                                {new Date(product.createdAt).toLocaleString()}
                            </p>
                        </>
                    )}
                </div>
                <div>
                    {product.imageUrl && (
                        <img
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
