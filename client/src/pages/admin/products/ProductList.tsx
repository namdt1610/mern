import React, { useState, useMemo, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
    useDeleteProductMutation,
    useGetProductsQuery,
} from '@/services/ProductApi'
import {
    Button,
    Card,
    Popconfirm,
    Space,
    Table,
    Radio,
    Divider,
    App,
    Input,
    Tooltip,
} from 'antd'
import { DeleteOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons'
import LoadingError from '@/components/shared/LoadingError'
import { IProduct } from '@/types/IProduct'
import type { TableColumnsType, TableProps } from 'antd'
import { debounce } from 'lodash'

const ProductPage: React.FC = () => {
    const navigate = useNavigate()
    const { message } = App.useApp()
    const { Search } = Input

    // Fetching product data using RTK Query
    const {
        data: products = [],
        isLoading,
        isError,
        refetch,
    } = useGetProductsQuery()
    const [deleteProduct] = useDeleteProductMutation()
    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>(
        'checkbox'
    )
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [filteredData, setFilteredData] = useState<IProduct[]>([])
    const [searchTerm, setSearchTerm] = useState('')

    // Handle delete products
    const handleDelete = async (_id: string) => {
        try {
            await deleteProduct(_id).unwrap()
            message.success('Product deleted successfully')
            refetch()
        } catch (error) {
            message.error('Failed to delete product. Please try again.')
        }
    }

    // Handle real-time search
    const handleRealTimeSearch = useMemo(
        () =>
            debounce((value: string) => {
                const lowercasedValue = value.toLowerCase()
                if (!value.trim()) {
                    setFilteredData(products)
                } else {
                    const filtered = products.filter((product) =>
                        product.name.toLowerCase().includes(lowercasedValue)
                    )
                    setFilteredData(filtered)
                }
            }, 300), // Delay 300ms
        [products]
    )

    useEffect(() => {
        handleRealTimeSearch(searchTerm)
    }, [searchTerm, handleRealTimeSearch])

    // Delete multiple products
    const handleDeleteMultiple = async () => {
        if (selectedRowKeys.length === 0) {
            message.warning('Please pick at least one product to delete.')
            return
        }

        try {
            // Delete selected products
            await Promise.all(
                selectedRowKeys.map((key) =>
                    deleteProduct(key as string).unwrap()
                )
            )
            message.success('Deleted products successfully.')
            // Reset
            setSelectedRowKeys([])
            refetch()
        } catch (error) {
            message.error('Delete products failed. Please try again.')
        }
    }

    // Table logic
    interface ColumnType {
        title: string
        dataIndex?: string
        key: string
        render?: (_: any, record: IProduct) => JSX.Element
    }

    const columns: TableColumnsType<IProduct> = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
            width: '40%',
            sorter: (a, b) => (a.name ?? '').localeCompare(b.name ?? ''),
            render: (_, { name, _id }) => (
                <Link to={`/admin/products/${_id}`}>{name}</Link>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => (a.price ?? 0) - (b.price ?? 0),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record: IProduct) => (
                <Space direction="horizontal" wrap size={10}>
                    <Tooltip title="View product details">
                        <Button
                            variant="outlined"
                            onClick={() =>
                                navigate(`/admin/products/${record._id}`)
                            } // Navigate to the product details page
                        >
                            View
                        </Button>
                    </Tooltip>
                    <Popconfirm
                        title="Are you sure you want to delete this product?"
                        onConfirm={() => handleDelete(record._id)}
                    >
                        <Button icon={<DeleteOutlined />} danger>
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    // Row selection
    const rowSelection: TableProps<IProduct>['rowSelection'] = {
        onChange: (
            newSelectedRowKeys: React.Key[],
            selectedRows: IProduct[]
        ) => {
            console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                'selectedRows: ',
                selectedRows
            )
            setSelectedRowKeys(newSelectedRowKeys)
        },
        getCheckboxProps: (record: IProduct) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    }

    // Conditions
    if (isError || isLoading || !products) {
        return (
            <LoadingError
                isLogin={false}
                title="Products List"
                isLoading={isLoading}
                isError={isError}
                refetch={refetch}
            />
        )
    }

    return (
        <>
            <Card
                title="Product List"
                extra={
                    <Space direction="horizontal" wrap size={10}>
                        <Tooltip title="Search for a product">
                            <Search
                                placeholder="Input search text"
                                allowClear
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ width: 'auto' }}
                            />
                        </Tooltip>

                        <Tooltip title="Click to refetch the product list">
                            <Button
                                type="dashed"
                                onClick={() => refetch()}
                                icon={<ReloadOutlined />}
                            >
                                Refresh
                            </Button>
                        </Tooltip>

                        <Tooltip title="Click to add a new product">
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => navigate('/admin/products/new')}
                            >
                                Add Product
                            </Button>
                        </Tooltip>
                    </Space>
                }
                className="my-4"
            >
                <Radio.Group
                    onChange={(e) => setSelectionType(e.target.value)}
                    value={selectionType}
                >
                    <Radio value="checkbox">Checkbox</Radio>
                    <Radio value="radio">Radio</Radio>
                </Radio.Group>
                <Divider />
                <Table<IProduct>
                    scroll={{ x: 'max-content' }}
                    sticky={true}
                    rowSelection={{ type: selectionType, ...rowSelection }}
                    columns={columns}
                    dataSource={filteredData}
                    rowKey="_id"
                    pagination={{ pageSize: 10 }}
                    // Using footer to display the number of selected products
                    footer={() => (
                        <Space
                            direction="horizontal"
                            wrap
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <span>
                                Tổng số sản phẩm đã chọn:{' '}
                                <b>{selectedRowKeys.length}</b>
                            </span>
                            <Popconfirm
                                title="Are you sure deleting these products?"
                                onConfirm={handleDeleteMultiple}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button danger icon={<DeleteOutlined />}>
                                    Delete selected products
                                </Button>
                            </Popconfirm>
                        </Space>
                    )}
                />
            </Card>
        </>
    )
}

export default ProductPage
