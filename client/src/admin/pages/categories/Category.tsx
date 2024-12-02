import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Space, Input, Table, Modal, Card } from 'antd/lib'
import { ColumnsType } from 'antd/lib/table'
import { ReloadOutlined, PlusOutlined, ImportOutlined } from '@ant-design/icons'
import { debounce } from 'lodash'
import { Category } from '../../../interfaces/Category'
import useCategoryActions from '../../../hooks/Auth/useCategoryActions'

export default function Categories() {
    const { fetchCategories } = useCategoryActions()
    const navigate = useNavigate()
    const [categories, setCategories] = useState<Category[]>([])
    const [filteredData, setFilteredData] = useState<Category[]>([])

    const getCategories = async () => {
        const response = await fetchCategories()
        setCategories(
            response.map((category: Category) => ({
                ...category,
                key: category._id,
            }))
        )
        setFilteredData(response)
    }

    useEffect(() => {
        getCategories()
    }, [])

    const handleView = (id: string) => {
        navigate(`/admin/categories/${id}`)
    }

    const handleDelete = (categoryId: string) => {
        Modal.confirm({
            title: 'Are you sure?',
            content: 'Do you really want to delete this category?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                console.log('Delete category ID:', categoryId)
            },
        })
    }

    const onSearch = useMemo(
        () =>
            debounce((value: string) => {
                const lowercasedValue = value.toLowerCase()
                if (value === '') {
                    setFilteredData(categories)
                } else {
                    const filtered = categories.filter((category) =>
                        category.name?.toLowerCase().includes(lowercasedValue)
                    )
                    setFilteredData(filtered)
                }
            }, 300),
        [categories]
    )

    const { Search } = Input

    const renderActions = useCallback(
        (_: unknown, record: Category): JSX.Element => (
            <Space size={'middle'} wrap>
                <Button
                    color="primary"
                    variant="outlined"
                    className="btn-border btn-hover"
                    onClick={() => handleView(record._id)}
                >
                    View
                </Button>
                <Button
                    color="danger"
                    variant="outlined"
                    className="btn-border btn-hover"
                    onClick={() => handleDelete(record._id)}
                >
                    Delete
                </Button>
            </Space>
        ),
        []
    )

    const columns: ColumnsType<Category> = useMemo(
        () => [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                sorter: (a, b) => (a.name ?? '').localeCompare(b.name ?? ''),
                render: (_, { name, _id }) => (
                    <Link to={`/admin/categories/${_id}`}>{name}</Link>
                ),
            },
            {
                title: 'Action',
                key: 'action',
                render: renderActions,
            },
        ],
        []
    )

    return (
        <>
            <Card className="my-6 card-border">
                <Space size={'middle'} wrap>
                    <Link to={'/admin/categories/new'}>
                        <Button
                            size="large"
                            className="btn-border btn-hover"
                            icon={<PlusOutlined />}
                        >
                            New
                        </Button>
                    </Link>
                    <Button
                        size="large"
                        className="btn-border btn-hover"
                        icon={<ImportOutlined />}
                    >
                        Import
                    </Button>
                    <Button
                        size="large"
                        className="btn-border btn-hover"
                        onClick={() => getCategories()}
                        icon={<ReloadOutlined />}
                    >
                        Refresh
                    </Button>
                    <Search
                        size="large"
                        placeholder="input search text"
                        allowClear
                        onSearch={onSearch}
                        style={{ width: 'auto' }}
                    />
                </Space>
            </Card>
            <Card
                className="card-border"
                title={'Category Management'}
                color="#f3f3f3"
            >
                <Table
                    size="large"
                    tableLayout="fixed"
                    rowClassName={'cursor-pointer'}
                    className="border-black border rounded-lg"
                    dataSource={filteredData}
                    columns={columns}
                    locale={{
                        emptyText:
                            filteredData.length === 0
                                ? 'No matching keywords'
                                : 'No data',
                    }}
                />
            </Card>
        </>
    )
}
