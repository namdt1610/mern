import React, { useState, useMemo, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DataTable from '../../components/DataTable'
import useFetchData from '../../../hooks/useFetchData'
import ConfirmationModal from '../../components/ConfirmationModal'
import Skeleton from 'react-loading-skeleton'
import { ProductsContext } from '../../../context/ProductContext'

const Products = () => {
    const { dispatch } = useContext(ProductsContext)
    const { page = 1 } = useParams()
    const navigate = useNavigate()
    const currentPage = parseInt(page) || 1
    const [productsPerPage, setProductsPerPage] = useState(5)
    const apiUrl = `/api/admin/products?page=${currentPage}&limit=${productsPerPage}`

    const {
        data: products = [],
        total,
        loading,
        error,
    } = useFetchData(apiUrl, dispatch, 'SET_PRODUCTS')

    const [sortedField, setSortedField] = useState(null)
    const [sortDirection, setSortDirection] = useState('asc')

    const [showModal, setShowModal] = useState(false)
    const [productToDelete, setProductToDelete] = useState(null)

    const sortedProducts = useMemo(() => {
        if (!sortedField) return products
        const direction = sortDirection === 'asc' ? 1 : -1
        return [...products].sort((a, b) =>
            a[sortedField] > b[sortedField] ? direction : -direction
        )
    }, [products, sortedField, sortDirection])

    const currentProducts = useMemo(() => {
        const indexOfLastProduct = currentPage * productsPerPage
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage
        return sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    }, [sortedProducts, currentPage, productsPerPage])

    const handleSort = (field) => {
        setSortedField(field)
        setSortDirection((prevDirection) =>
            prevDirection === 'asc' ? 'desc' : 'asc'
        )
    }

    const handlePageChange = (page) => {
        navigate(`/admin/products/page/${page}`)
    }

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
                title="My Data Table"
                onRowClick={handleView}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={openDeleteModal}
            />
            {showModal && (
                <ConfirmationModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={handleDelete}
                    message="Are you sure you want to delete this product?"
                />
            )}
        </>
    )
}

export default Products
