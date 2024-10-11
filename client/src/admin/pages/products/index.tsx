import React, { useState, useEffect, useContext } from 'react'
import Skeleton from 'react-loading-skeleton'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { fetchProducts, deleteProduct } from '../../../hook/useProductActions'
import { ProductContext } from '../../../context/ProductContext'
import { ProductIndex } from './ProductIndex'
// import { getCache, setCache } from '../../utils/cache'

const Products = () => {
    const dispatch = useContext(ProductContext)
    const navigate = useNavigate()

    const [showModal, setShowModal] = useState(false)
    const [productToDelete, setProductToDelete] = useState(null)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const loadProducts = async () => {
        const cacheKey = '/api/admin/products'

        const cachedProducts = getCache(cacheKey)
        if (cachedProducts) {
            setProducts(cachedProducts)
            setLoading(false)
            return
        }

        if (products.length > 0) return
        try {
            const response = await fetchProducts(dispatch)
            console.log('Products:', response.products)
            setProducts(response.products)
            setCache(cacheKey, response.products)
        } catch (error) {
            console.error('Failed to fetch products:', error)
            toast.error('Failed to fetch products')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!productToDelete) return

        try {
            const response = await deleteProduct(productToDelete, dispatch)
            if (response) {
                toast.success('Product deleted successfully')
                setShowModal(false)
                loadProducts()
            } else {
                toast.error('Failed to delete product')
                throw new Error('Failed to delete product')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setProductToDelete(null)
        }
    }

    useEffect(() => {
        loadProducts()
    }, [])

    const handleView = (productId) => {
        navigate(`/admin/products/${productId}`)
    }

    const handleEdit = (productId) => {
        navigate(`/admin/products/edit/${productId}`)
    }

    const openDeleteModal = (productId) => {
        setProductToDelete(productId)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    if (!products.length) return <Skeleton count={5} height={40} />
    if (products.length === 0) return <div>No products found</div>

    const headCells = [
        { id: 'name', numeric: false, label: 'Name' },
        { id: 'description', numeric: true, label: 'Description' },
        { id: 'price', numeric: true, label: 'Price' },
        { id: 'category', numeric: true, label: 'Category' },
        { id: 'stock', numeric: true, label: 'Stock' },
    ]

    return (
        <>
            <ProductIndex />
        </>
    )
}

export default Products
