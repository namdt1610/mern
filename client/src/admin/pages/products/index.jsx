import { useEffect, useState } from 'react'
import { useProductsContext } from '../../../hooks/useProductsContext'
import DataTable from '../../components/DataTable'
import { useNavigate } from 'react-router-dom'
import ConfirmationModal from '../../components/ConfirmationModal'

const Products = () => {
    const { products, dispatch } = useProductsContext()
    const [sortedField, setSortedField] = useState(null)
    const [sortDirection, setSortDirection] = useState('asc')
    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage, setProductsPerPage] = useState(10)
    const [showModal, setShowModal] = useState(false)
    const [productToDelete, setProductToDelete] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('/api/admin/products')
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_PRODUCTS', payload: json })
            }
        }

        fetchProducts()
    }, [dispatch])

    const handleView = (productId) => {
        console.log('Viewing product', productId)
        navigate(`/products/${productId}`)
    }

    const handleEdit = (productId) => {
        console.log('Editing product', productId)
        navigate(`/products/edit/${productId}`)
    }

    const openDeleteModal = (productId) => {
        setProductToDelete(productId)
        setShowModal(true)
    }

    const handleDelete = async () => {
        if (productToDelete) {
            const response = await fetch(
                `/api/admin/products/${productToDelete}`,
                {
                    method: 'DELETE',
                }
            )
            if (response.ok) {
                dispatch({
                    type: 'SET_PRODUCTS',
                    payload: products.filter(
                        (product) => product._id !== productToDelete
                    ),
                })
                console.log('Deleted product', productToDelete)
                setProductToDelete(null)
                setShowModal(false)
            }
        }
    }

    const sortedProducts = [...products].sort((a, b) => {
        if (sortedField) {
            if (sortDirection === 'asc') {
                return a[sortedField] > b[sortedField] ? 1 : -1
            } else {
                return a[sortedField] < b[sortedField] ? 1 : -1
            }
        }
        return products
    })

    const handleSort = (field) => {
        setSortedField(field)
        setSortDirection((prevDirection) =>
            prevDirection === 'asc' ? 'desc' : 'asc'
        )
    }

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = sortedProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    )
    const totalPages = Math.ceil(products.length / productsPerPage)

    const handlePageChange = (page) => setCurrentPage(page)

    const productColumns = [
        { key: 'name', label: 'Product Name' },
        { key: 'price', label: 'Price' },
        { key: 'category', label: 'Category' },
    ]

    return (
        <>
            <DataTable
                data={currentProducts}
                handleSort={handleSort}
                sortedField={sortedField}
                sortDirection={sortDirection}
                columns={productColumns}
                currentPage={currentPage}
                productsPerPage={productsPerPage}
                setProductsPerPage={setProductsPerPage}
                handlePageChange={handlePageChange}
                totalPages={totalPages}
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
