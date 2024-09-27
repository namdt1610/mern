import React, { useState, useMemo, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DataTable from '../../components/DataTable'
import useFetchData from '../../../hooks/useFetchData'
import ConfirmationModal from '../../components/ConfirmationModal'
import Skeleton from 'react-loading-skeleton'
import { ProductContext } from '../../../context/ProductContext'

interface ApiResponse {
    products: Array<{
        name: string;
        description: string;
        price: number;
        category: string;
        stock: number;

    }>;
    totalProducts: number;
}

const Products = () => {
    const { dispatch } = useContext(ProductContext)
    const { page = '1' } = useParams()
    const navigate = useNavigate()
    const currentPage = parseInt(page) || 1
    const apiUrl = `/api/admin/products?page=${currentPage}`

    const extractProductsData = (result: ApiResponse) => result.products
    const extractProductsTotal = (result: ApiResponse) => result.totalProducts

    const {
        data: products = [],
        total,
        loading,
        error,
    } = useFetchData(apiUrl, dispatch, 'SET_PRODUCTS', extractProductsData, extractProductsTotal)

    const [showModal, setShowModal] = useState(false)
    const [productToDelete, setProductToDelete] = useState(null)

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

    const handleDelete = async () => {
        if (!productToDelete) return

        try {
            const response = await fetch(
                `/api/admin/products/${productToDelete}`,
                { method: 'DELETE' }
            )
            if (response.ok) {
                setShowModal(false)
            } else {
                throw new Error('Failed to delete product')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setProductToDelete(null)
        }
    }

    if (loading) return <Skeleton count={5} height={40} />
    if (error) return <div>Error: {error}</div>
    if (products.length === 0) return <div>No products found</div>

    const rows = products

    const headCells = [
        { id: 'name', numeric: false, label: 'Name' },
        { id: 'description', numeric: true, label: 'Description' },
        { id: 'price', numeric: true, label: 'Price' },
        { id: 'category', numeric: true, label: 'Category' },
        { id: 'stock', numeric: true, label: 'Stock' },
    ]

    return (
        <>
            <DataTable
                rows={rows}
                headCells={headCells}
                onRowClick={handleView}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={openDeleteModal}
                title="My Data Table"
            />
            {showModal ? (
                <ConfirmationModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={handleDelete}
                    message="Are you sure you want to delete this product?"
                />
            ) : null}
        </>
    )
}

export default Products
