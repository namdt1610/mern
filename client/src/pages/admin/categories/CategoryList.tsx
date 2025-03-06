import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, Input, message, Modal, Space, Table } from 'antd/lib'
import { ColumnsType } from 'antd/lib/table'
import { ImportOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons'
import { debounce } from 'lodash'
import { Category } from '@/types/Category'
import {
    useDeleteCategoryMutation,
    useGetCategoriesQuery,
} from '@/services/CategoryApi'

export default function Categories() {
    const navigate = useNavigate()
    const [filteredData, setFilteredData] = useState<Category[]>([])
    const { data: cates, error, isLoading, refetch } = useGetCategoriesQuery()
    const [deleteCategory] = useDeleteCategoryMutation()

    // Lọc dữ liệu
    useEffect(() => {
        if (cates) setFilteredData(cates)
    }, [cates])

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
                deleteCategory(categoryId)
                    .then(() => {
                        message.success('Category deleted successfully')
                        refetch()
                    })
                    .catch((error) => {
                        if (error?.data?.message) {
                            message.error(error.data.message)
                        } else {
                            message.error(
                                'Failed to delete category. Please try again.'
                            )
                        }
                        console.error('Error from backend:', error)
                    })
            },
        })
    }

    // Tìm kiếm
    const onSearch = useMemo(
        () =>
            debounce((value: string) => {
                const lowercasedValue = value.toLowerCase()
                if (value === '') {
                    setFilteredData(cates)
                } else {
                    const filtered = cates.filter((cate) =>
                        cate.name?.toLowerCase().includes(lowercasedValue)
                    )
                    setFilteredData(filtered)
                }
            }, 300),
        [cates]
    )

    const { Search } = Input

    const renderActions = useCallback(
        (_: unknown, cates: Category): JSX.Element => (
            <Space size={'middle'} wrap>
                <Button
                    variant="outlined"
                    className="btn-border btn-hover"
                    onClick={() => handleView(cates._id)}
                >
                    View
                </Button>
                <Button
                    color="danger"
                    variant="outlined"
                    className="btn-border btn-hover"
                    onClick={() => handleDelete(cates._id)}
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
                        onClick={() => refetch()}
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
                    rowKey={(record) => record._id}
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
