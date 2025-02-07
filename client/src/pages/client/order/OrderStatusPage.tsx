import React, { useEffect, useState } from 'react'
import { useGetOrdersQuery } from '@/services/OrderApi'
import { Table, Button, Typography } from 'antd'
import dayjs from 'dayjs'
import MainLayout from '@/components/client/layouts/MainLayout'
import { useNavigate } from 'react-router-dom'
import { formatCurrency } from '@/utils/formatCurrency'

const { Paragraph } = Typography

const OrderStatusPage: React.FC = () => {
    const { data: orders, isLoading, isError } = useGetOrdersQuery()
    const nav = useNavigate()

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Failed to load orders!</div>

    const columns = [
        {
            title: 'Order ID',
            dataIndex: '_id',
            key: '_id',
            render: (record: string) => (
                <Paragraph copyable>{record}</Paragraph>
            ),
        },
        {
            title: 'Items',
            dataIndex: 'orderItems',
            key: 'orderItems',
            render: (items: any[]) => (
                <ul>
                    {items.map((item) => (
                        <li key={item.product}>
                            {item.image}
                            {item.name} x {item.quantity}
                        </li>
                    ))}
                </ul>
            ),
        },
        {
            title: 'Shipping Address',
            dataIndex: 'shippingAddress',
            key: 'shippingAddress',
            render: (address: any) =>
                `${address.address}, ${address.ward}, ${address.district}, ${address.province}`,
        },
        {
            title: 'Payment Method',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
        },
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (text: number) => formatCurrency(text),
        },
        {
            title: 'Status',
            key: 'status',
            render: (record: any) => (
                <span>
                    {record.isPaid ? 'Paid' : 'Pending'} |{' '}
                    {record.isDelivered
                        ? `Delivered on ${dayjs(record.deliveredAt).format(
                              'YYYY-MM-DD'
                          )}`
                        : 'Not Delivered'}
                </span>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (record: any) => (
                <Button
                    type="primary"
                    onClick={() => handleOrderDetail(record._id)}
                >
                    View Details
                </Button>
            ),
        },
    ]

    const handleOrderDetail = (orderId: string) => {
        nav(`/order/${orderId}`)
    }

    return (
        <MainLayout>
            <div style={{ maxWidth: 1300, margin: '20px auto' }}>
                <h2>Order Status</h2>
                <Table
                    dataSource={orders}
                    columns={columns}
                    rowKey="_id"
                    bordered
                    pagination={{ pageSize: 10 }}
                    size="small"
                />
            </div>
        </MainLayout>
    )
}

export default OrderStatusPage
