import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    useGetProductsQuery,
    useDeleteProductMutation,
} from 'services/ProductApi'
import {
    Card,
    Table,
    Button,
    Space,
    Popconfirm,
    message,
    Spin,
    Typography,
} from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import LoadingError from 'components/LoadingError'
import { Product } from 'interfaces/Product'

const { Title } = Typography

const ProductPage: React.FC = () => {
    const navigate = useNavigate()

    // Fetching product data using RTK Query
    const {
        data: products,
        isLoading,
        isError,
        refetch,
    } = useGetProductsQuery()
    const [deleteProduct] = useDeleteProductMutation()

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

    if (isError) {
        return (
            <LoadingError
                isLoading={isLoading}
                error={isError}
                refetch={refetch}
            />
        )
    }

    const columns = [
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
                        onClick={() => navigate(`/admin/products/${record._id}`)} // Navigate to the product details page
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

    return (
        <>
            <Card
                title="Product List"
                extra={
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => navigate('/admin/products/new')} // Navigate to the add product page
                    >
                        Add Product
                    </Button>
                }
                className="my-4"
            >
                <Table
                    columns={columns}
                    dataSource={products}
                    rowKey="_id"
                    pagination={{ pageSize: 10 }}
                />
            </Card>
        </>
    )
}

export default ProductPage
