import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    useDeleteProductMutation,
    useGetProductsQuery,
} from '@/services/ProductApi'
import {
    Button,
    Card,
    message,
    Popconfirm,
    Space,
    Spin,
    Table,
    Radio,
    Divider,
    App,
} from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import LoadingError from '@/components/shared/LoadingError'
import { Product } from '@shared/types/Product'
import type { TableColumnsType, TableProps } from 'antd'

const ProductPage: React.FC = () => {
    const navigate = useNavigate()
    const { message } = App.useApp()

    // Fetching product data using RTK Query
    const {
        data: products,
        isLoading,
        isError,
        refetch,
    } = useGetProductsQuery()
    const [deleteProduct] = useDeleteProductMutation()
    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>(
        'checkbox'
    )
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

    // Handle delete product
    const handleDelete = async (_id: string) => {
        try {
            await deleteProduct(_id).unwrap()
            message.success('Product deleted successfully')
            refetch()
        } catch (error) {
            message.error('Failed to delete product. Please try again.')
        }
    }

    if (isLoading) {
        return <Spin tip="Loading products..." />
    }

    // Handle delete nhiều sản phẩm cùng lúc
    const handleDeleteMultiple = async () => {
        if (selectedRowKeys.length === 0) {
            message.warning('Vui lòng chọn ít nhất 1 sản phẩm để xóa.')
            return
        }

        try {
            // Xóa đồng thời các sản phẩm đã chọn
            await Promise.all(
                selectedRowKeys.map((key) =>
                    deleteProduct(key as string).unwrap()
                )
            )
            message.success('Xóa các sản phẩm đã chọn thành công')
            // Reset lại danh sách đã chọn sau khi xóa
            setSelectedRowKeys([])
            refetch()
        } catch (error) {
            message.error('Xóa sản phẩm thất bại. Vui lòng thử lại.')
        }
    }

    if (isError) {
        return (
            <LoadingError
                isLogin={false}
                title="Products"
                isLoading={isLoading}
                isError={isError}
                refetch={refetch}
            />
        )
    }

    interface ColumnType {
        title: string
        dataIndex?: string
        key: string
        render?: (_: any, record: Product) => JSX.Element
    }

    const columns: TableColumnsType<Product> = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record: Product) => (
                <Space size="middle">
                    <Button
                        type="link"
                        onClick={() =>
                            navigate(`/admin/products/${record._id}`)
                        } // Navigate to the product details page
                    >
                        Edit
                    </Button>
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

    const rowSelection: TableProps<Product>['rowSelection'] = {
        onChange: (
            newSelectedRowKeys: React.Key[],
            selectedRows: Product[]
        ) => {
            console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                'selectedRows: ',
                selectedRows
            )
            setSelectedRowKeys(newSelectedRowKeys)
        },
        getCheckboxProps: (record: Product) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    }

    return (
        <>
            <Card
                title="Product List"
                extra={
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => navigate('/admin/products/new')}
                    >
                        Add Product
                    </Button>
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
                <Table<Product>
                    rowSelection={{ type: selectionType, ...rowSelection }}
                    columns={columns}
                    dataSource={products}
                    rowKey="_id"
                    pagination={{ pageSize: 10 }}
                    // Sử dụng thuộc tính footer để hiển thị thông tin và nút xóa nhiều sản phẩm
                    footer={() => (
                        <Space
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
                                title="Bạn có chắc chắn muốn xóa các sản phẩm đã chọn?"
                                onConfirm={handleDeleteMultiple}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button danger icon={<DeleteOutlined />}>
                                    Xóa sản phẩm đã chọn
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
