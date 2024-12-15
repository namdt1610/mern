import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Product } from '@shared/types/Product' // Tạo interface cho sản phẩm
import { debounce } from 'lodash'
import { Link, useNavigate } from 'react-router-dom'
import { Badge, Button, Card, Input, message, Modal, Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import {
    DeleteOutlined,
    ImportOutlined,
    PlusOutlined,
    ReloadOutlined,
} from '@ant-design/icons'
import {
    useDeleteProductMutation,
    useGetProductsQuery,
} from '@/services/ProductApi' // Dịch vụ API cho sản phẩm
import LoadingError from '@/components/LoadingError'

export default function Inventory() {
    // Interface cho record sản phẩm
    interface ActionRecord extends Product {
        _id: string
    }

    const navigate = useNavigate()
    const [deleteProduct] = useDeleteProductMutation()
    const [filteredData, setFilteredData] = useState<Product[]>([])
    const { data: products, error, isLoading, refetch } = useGetProductsQuery()

    // Lọc dữ liệu
    useEffect(() => {
        if (products) setFilteredData(products)
    }, [products])

    // Tìm kiếm
    const onSearch = useMemo(() => {
        return debounce((value: string) => {
            const lowercasedValue = value.toLowerCase()
            const filtered = products?.filter((product) =>
                ['name', 'sku', 'category', 'status'].some((key) =>
                    (product as any)[key]?.toLowerCase()?.includes(lowercasedValue)
                )
            )
            setFilteredData(filtered ?? [])
        }, 300)
    }, [products])

    // Render actions dùng useCallback vì truyền vào Table
    const renderActions = useCallback(
        (_: unknown, record: ActionRecord): JSX.Element => (
            <Space size={'middle'} wrap>
                <Button
                    color="primary"
                    variant="outlined"
                    className="btn-border btn-hover"
                    onClick={() => handleView(record._id)}
                >
                    Xem
                </Button>
                <Button
                    color="danger"
                    variant="outlined"
                    className="btn-border btn-hover"
                    onClick={() => handleDelete(record._id)}
                    icon={<DeleteOutlined />}
                >
                    Xóa
                </Button>
            </Space>
        ),
        []
    )

    // Dùng useMemo để tránh re-render vì columns là danh sách tĩnh
    const columns: ColumnsType<Product> = useMemo(
        () => [
            {
                title: 'Image',
                dataIndex: 'image',
                key: 'image',
                render: (image) => (
                    <img
                        src={image || '/img/default-product.png'}
                        alt="Product"
                        className="w-20 h-20 object-cover"
                        loading="lazy"
                    />
                ),
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                sorter: (a, b) => (a.name ?? '').localeCompare(b.name ?? ''),
                render: (_, { name, _id }) => (
                    <Link to={`/admin/inventory/${_id}`}>{name}</Link>
                ),
            },
            {
                title: 'SKU',
                dataIndex: 'sku',
                key: 'sku',
                sorter: (a, b) => a.sku.localeCompare(b.sku),
            },
            {
                title: 'Category',
                dataIndex: 'category',
                key: 'category',
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
                render: (price) => `$${price}`,
            },
            {
                title: 'Stock',
                dataIndex: 'stock',
                key: 'stock',
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: (status) => (
                    <Badge
                        className="capitalize"
                        status="processing"
                        color={status === 'available' ? 'green' : 'red'}
                        text={status}
                    />
                ),
                sorter: (a, b) => a.status.localeCompare(b.status),
            },
            {
                title: 'Action',
                key: 'action',
                render: renderActions,
            },
        ],
        []
    )

    // Xóa sản phẩm
    const handleDelete = (productId: string) => {
        Modal.confirm({
            title: 'Are you sure?',
            content: 'Do you really want to delete this product?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: async () => {
                deleteProduct(productId)
                    .then(() => {
                        message.success('Product deleted successfully!')
                    })
                    .catch((error) => {
                        const errorMessage =
                            error?.data?.message || 'Failed to delete product!'
                        message.error(errorMessage)
                        console.error('Delete error:', error)
                    })
            },
        })
    }

    const handleRefresh = () => {
        refetch()
        if (products) setFilteredData(products)
    }

    const handleView = (id: string) => {
        navigate(`/admin/inventory/${id}`)
    }

    const { Search } = Input

    // Xử lý loading và error
    if (isLoading || error) {
        return (
            <LoadingError
                isLoading={isLoading}
                error={error}
                refetch={refetch}
            />
        )
    }

    return (
        <>
            <Card className="my-6 card-border">
                <Space size={'middle'} wrap>
                    <Link to={'/admin/inventory/add'}>
                        <Button
                            size="large"
                            className="btn-border btn-hover"
                            icon={<PlusOutlined />}
                        >
                            New Product
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
                        onClick={() => handleRefresh()}
                        icon={<ReloadOutlined />}
                    >
                        Refresh
                    </Button>
                    <Search
                        size="large"
                        placeholder="Search products"
                        allowClear
                        enterButton="Search"
                        onSearch={onSearch}
                        style={{ width: 'auto' }}
                    />
                </Space>
            </Card>
            <Card
                className="card-border"
                title={'Inventory Management'}
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
                        emptyText: !products
                            ? 'Loading data...'
                            : filteredData.length === 0
                            ? 'No matching records found'
                            : 'No data available',
                    }}
                />
            </Card>
        </>
    )
}
