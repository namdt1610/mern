import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Product } from '../../../interfaces/Product'
import useProductActions from '../../../hooks/product/useProductActions'
import { Button, Space, Badge, Input, Table, Card } from 'antd/lib'
import { ColumnsType } from 'antd/lib/table'
import type { SearchProps } from 'antd/lib/input/'

export default function Products() {
    const { fetchProducts } = useProductActions()
    const navigate = useNavigate()
    const [products, setProducts] = useState<Product[]>([])
    const [filteredData, setFilteredData] = useState<Product[]>([])

    useEffect(() => {
        const getProducts = async () => {
            const data = await fetchProducts()
            setProducts(
                data.map((product: Product) => ({
                    ...product,
                    key: product._id,
                }))
            )
        }

        getProducts()
    }, [])

    const columns: ColumnsType<Product> = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image) => (
                <img
                    src={
                        image
                            ? `http://localhost:8888/${image}`
                            : '/img/default.png'
                    }
                    alt="Product"
                    className="w-20 h-20 object-cover"
                />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => (a.name ?? '').localeCompare(b.name ?? ''),
            render: (_, { name, _id }) => (
                <Link to={`/admin/products/${_id}`}>{name}</Link>
            ),
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            sorter: (a, b) => a.category.localeCompare(b.category),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
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
                ></Badge>
            ),
            sorter: (a, b) => a.status.localeCompare(b.status),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div>
                    <Space wrap>
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
        navigate(`/admin/products/${id}`)
    }

    const handleDelete = (productId: string) => {
        console.log('Delete product ID:', productId)
    }

    const onSearch: SearchProps['onSearch'] = (value) => {
        console.log('Search:', value)
        const lowercasedValue = value.toLowerCase()
        const filtered = products.filter(
            (product) =>
                product.name?.toLowerCase().includes(lowercasedValue) ||
                product.category?.toLowerCase().includes(lowercasedValue) ||
                product.price.toString().includes(lowercasedValue) ||
                product.stock.toString().includes(lowercasedValue) ||
                product.status?.toLowerCase().includes(lowercasedValue)
        )
        setFilteredData(filtered)
    }

    const { Search } = Input

    return (
        <>
            <div className="my-4">
                <Space>
                    <Button>New</Button>
                    <Button>Import</Button>
                    <Search
                        placeholder="input search text"
                        allowClear
                        onSearch={onSearch}
                        style={{ width: 200 }}
                    />
                </Space>
            </div>
            <Card className="card-border">
                <Table
                    bordered
                    size="large"
                    tableLayout="fixed"
                    rowClassName={'cursor-pointer'}
                    className="border-black border rounded-lg"
                    columns={columns}
                    dataSource={filteredData.length ? filteredData : products}
                    locale={{
                        emptyText:
                            filteredData.length === 0
                                ? 'Không có từ khóa trùng khớp'
                                : 'Không có dữ liệu',
                    }}
                />
            </Card>
        </>
    )
}
