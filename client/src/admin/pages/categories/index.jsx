// pages/Categories.jsx
import React, { useState, useEffect } from 'react'
import DataTable from '../../components/DataTable'

const Categories = () => {
    const [categories, setCategories] = useState([])
    const [sortedField, setSortedField] = useState(null)
    const [sortDirection, setSortDirection] = useState('asc')
    const [currentPage, setCurrentPage] = useState(1)
    const [categoriesPerPage, setCategoriesPerPage] = useState(10)

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('/api/admin/categories')
            const json = await response.json()

            if (response.ok) {
                setCategories(json)
            }
        }

        fetchCategories()
    }, [])

    const sortedCategories = [...categories].sort((a, b) => {
        if (sortedField) {
            if (sortDirection === 'asc') {
                return a[sortedField] > b[sortedField] ? 1 : -1
            } else {
                return a[sortedField] < b[sortedField] ? 1 : -1
            }
        }
        return categories
    })

    const handleSort = (field) => {
        setSortedField(field)
        setSortDirection((prevDirection) =>
            prevDirection === 'asc' ? 'desc' : 'asc'
        )
    }

    // Pagination logic
    const indexOfLastCategory = currentPage * categoriesPerPage
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage
    const currentCategories = sortedCategories.slice(
        indexOfFirstCategory,
        indexOfLastCategory
    )
    const totalPages = Math.ceil(categories.length / categoriesPerPage)

    const handlePageChange = (page) => setCurrentPage(page)

    // Các cột trong bảng danh mục
    const categoryColumns = [
        { key: 'name', label: 'Category Name' },
        { key: 'description', label: 'Description' },
    ]

    return (
        <DataTable
            data={currentCategories}
            handleSort={handleSort}
            sortedField={sortedField}
            sortDirection={sortDirection}
            columns={categoryColumns}
            currentPage={currentPage}
            productsPerPage={categoriesPerPage}
            setProductsPerPage={setCategoriesPerPage}
            handlePageChange={handlePageChange}
            totalPages={totalPages}
        />
    )
}

export default Categories
