import { useEffect, useState } from 'react'
import { useProductsContext } from '../../../hooks/useProductsContext'
import DataTable from '../../components/DataTable'
import { useNavigate, useParams } from 'react-router-dom'
import ConfirmationModal from '../../components/ConfirmationModal'

const Products = () => {
    const { products = [], dispatch } = useProductsContext()
    const [totalProducts, setTotalProducts] = useState(0)

    const [sortedField, setSortedField] = useState(null)
    const [sortDirection, setSortDirection] = useState('asc')

    const [showModal, setShowModal] = useState(false)
    const [productToDelete, setProductToDelete] = useState(null)

    const { page = 1 } = useParams()
    const [currentPage, setCurrentPage] = useState(parseInt(page))
    const [productsPerPage, setProductsPerPage] = useState(5)

    const navigate = useNavigate()

    useEffect(() => {
        setCurrentPage(parseInt(page) || 1)
    }, [page])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const apiUrl = `/api/admin/products?page=${currentPage}&limit=${productsPerPage}`
                console.log('Fetching from URL:', apiUrl) // Kiểm tra URL API

                const response = await fetch(apiUrl)
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }

                const json = await response.json()
                console.log('API response:', json) // Kiểm tra dữ liệu trả về từ API

                dispatch({ type: 'SET_PRODUCTS', payload: json.products })
                setTotalProducts(json.totalProducts)
            } catch (error) {
                console.error('Failed to fetch products:', error)
            }
        }

        fetchProducts()
    }, [currentPage, productsPerPage, dispatch])

    useEffect(() => {
        setCurrentPage(parseInt(page) || 1)
    }, [page])

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
        if (productToDelete) {
            try {
                const response = await fetch(
                    `/api/admin/products/${productToDelete}`,
                    { method: 'DELETE' }
                )
                if (response.ok) {
                    dispatch({
                        type: 'DELETE_PRODUCT',
                        payload: { _id: productToDelete },
                    })
                    setProductToDelete(null)
                    setShowModal(false)
                } else {
                    throw new Error('Failed to delete product')
                }
            } catch (error) {
                console.error('Failed to delete product:', error)
            }
        }
    }

    const sortedProducts = sortedField
        ? [...products].sort((a, b) => {
              if (sortDirection === 'asc') {
                  return a[sortedField] > b[sortedField] ? 1 : -1
              } else {
                  return a[sortedField] < b[sortedField] ? 1 : -1
              }
          })
        : [...products]

    const handleSort = (field) => {
        setSortedField(field)
        setSortDirection((prevDirection) =>
            prevDirection === 'asc' ? 'desc' : 'asc'
        )
    }

    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = sortedProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    )

    const handlePageChange = (page) => {
        setCurrentPage(page)
        navigate(`/admin/products/page/${page}`)
    }

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
                totalProducts={totalProducts}
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
