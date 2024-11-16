import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import type { SearchProps } from 'antd/lib/input/'
import { ColumnsType } from 'antd/lib/table'
import { Button, Space, Input, Table } from 'antd/lib'
import { Category } from '../../../interfaces/Category'
import useCategoryActions from '../../../hooks/useCategoryActions'

export default function Categories() {
    const { fetchCategories } = useCategoryActions()
    const navigate = useNavigate()
    const [categories, setCategories] = useState<Category[]>([])
    const [filteredData, setFilteredData] = useState<Category[]>([])

    useEffect(() => {
        const getCategories = async () => {
            const data = await fetchCategories()
            setCategories(
                data.map((category: Category) => ({
                    ...category,
                    key: category._id,
                }))
            )
        }

        getCategories()
    }, [])

    const columns: ColumnsType<Category> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => (a.name ?? '').localeCompare(b.name ?? ''),
            render: (_, { name, _id }) => (
                <Link to={`/admin/categories/${_id}`}>{name}</Link>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div>
                    <Space>
                        <Button
                            color="primary"
                            variant="outlined"
                            onClick={() => handleView(record._id)}
                        >
                            View
                        </Button>
                        <Button
                            color="danger"
                            variant="outlined"
                            onClick={() => handleDelete(record._id)}
                        >
                            Delete
                        </Button>
                    </Space>
                </div>
            ),
        },
    ]

    const handleView = (id: string) => {
        navigate(`/admin/categories/${id}`)
    }

    const handleDelete = (categoryId: string) => {
        console.log('Delete category ID:', categoryId)
    }

    const onSearch: SearchProps['onSearch'] = (value) => {
        console.log('Search:', value)
        const lowercasedValue = value.toLowerCase()
        const filtered = categories.filter((category) =>
            category.name?.toLowerCase().includes(lowercasedValue)
        )
        setFilteredData(filtered)
    }

    const { Search } = Input

    return (
        <>
            <div className="my-4">
                <Space>
                    <Link to={'/admin/categories/new'}>
                        <Button>New</Button>
                    </Link>
                    <Button>Import</Button>
                    <Search
                        placeholder="input search text"
                        allowClear
                        onSearch={onSearch}
                        style={{ width: 200 }}
                    />
                </Space>
            </div>
            <Table
                dataSource={filteredData.length ? filteredData : categories}
                columns={columns}
            />
        </>
    )
}
