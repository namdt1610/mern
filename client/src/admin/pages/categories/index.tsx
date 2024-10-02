// pages/Categories.tsx
import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import DataTable from '../../components/DataTable'
import { CategoryContext } from '../../../context/CategoryContext'
import useFetchData from '../../../hook/useFetchData'
import Skeleton from 'react-loading-skeleton'
import ConfirmationModal from '../../components/ConfirmationModal'
import { Link } from 'react-router-dom'

interface ApiResponse {
    categories: Array<{
        name: string
    }>
    totalCategories: number
}

export const Categories = () => {
    const { dispatch } = useContext(CategoryContext)
    const { page = '1' } = useParams()
    const navigate = useNavigate()
    const currentPage = parseInt(page) || 1
    const apiUrl = `/api/admin/categories?page=${currentPage.toString()}`

    const extractCategoriesData = (result: ApiResponse) => result.categories
    const extractCategoriesTotal = (result: ApiResponse) =>
        result.totalCategories

    const {
        data: categories = [],
        total,
        loading,
        error,
    } = useFetchData(
        apiUrl,
        dispatch,
        'SET_CATEGORIES',
        extractCategoriesData,
        extractCategoriesTotal
    )
    // console.log(categories)

    const [sortedField, setSortedField] = useState(null)
    const [sortDirection, setSortDirection] = useState('asc')

    const [showModal, setShowModal] = useState(false)
    const [categoryToDelete, setCategoryToDelete] = useState(null)

    // Rows for the DataTable
    const categoryRows = categories

    // Columns for the DataTable
    const categoryColumns = [
        { id: 'name', label: 'Category Name' },
        { id: 'description', label: 'Description' },
    ]

    // Sort logic
    const sortedCategories = [...categories].sort((a, b) => {
        if (sortedField) {
            if (sortDirection === 'asc') {
                return a[sortedField] > b[sortedField] ? 1 : -1
            } else {
                return a[sortedField] < b[sortedField] ? 1 : -1
            }
        }
        return 0
    })

    const handleView = (categoryId) => {
        navigate(`/admin/categories/${categoryId}`)
    }

    const handleEdit = (categoryId) => {
        navigate(`/admin/categories/edit/${categoryId}`)
    }

    const openDeleteModal = (categoryId) => {
        setCategoryToDelete(categoryId)
        setShowModal(true)
    }

    const handleDelete = async () => {
        if (!categoryToDelete) return

        try {
            const response = await fetch(
                `/api/admin/categories/${categoryToDelete}`,
                { method: 'DELETE' }
            )
            if (response.ok) {
                setShowModal(false)
            } else {
                throw new Error('Failed to delete category')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setCategoryToDelete(null)
        }
    }

    if (loading) return <Skeleton count={5} height={40} />
    if (error) return <div>Error: {error}</div>
    if (categories.length === 0) return <div>No categorys found</div>

    return (
        <>
            <Link to={'/admin/categories/create'} className={styles.linkBtn}>
                New Categories
            </Link>
            <DataTable
                rows={categoryRows}
                headCells={categoryColumns}
                onRowClick={handleView}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={openDeleteModal}
                title="Categories"
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

export default Categories
