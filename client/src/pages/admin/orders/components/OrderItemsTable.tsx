import React from 'react'
import { Card, Table, Tag, Space, Typography } from 'antd'
import { OrderItems } from '@/types/Order'

const { Title } = Typography

interface OrderItemsTableProps {
    items: OrderItems[]
}

export default function OrderItemsTable({ items }: OrderItemsTableProps) {
    const columns = [
        {
            title: 'Product',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: any) => (
                <Space>
                    <img
                        src={record.image}
                        alt={text}
                        style={{ width: 50, height: 50, objectFit: 'cover' }}
                        className="rounded-lg"
                    />
                    <span>{text}</span>
                </Space>
            ),
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (quantity: number) => <Tag color="blue">{quantity}</Tag>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => (
                <Tag color="green">${price.toFixed(2)}</Tag>
            ),
        },
        {
            title: 'Total',
            key: 'total',
            render: (_: any, record: OrderItems) => (
                <Tag color="orange">
                    ${(record.price * record.quantity).toFixed(2)}
                </Tag>
            ),
        },
    ]

    return (
        <div className="mt-8">
            <Title level={5}>Order Items</Title>
            <Table
                dataSource={items}
                columns={columns}
                rowKey="id"
                pagination={false}
                className="border rounded-lg"
            />
        </div>
    )
}
