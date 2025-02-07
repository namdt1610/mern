import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetOrderByIdQuery } from '@/services/OrderApi'
import { Card, List, Typography, Divider, Button, Empty } from 'antd'
import dayjs from 'dayjs'
import MainLayout from '@/components/client/layouts/MainLayout'
import { formatCurrency } from '@/utils/formatCurrency'

const { Title, Text } = Typography

const OrderDetailsPage: React.FC = () => {
    const id = useParams().id ?? ''
    console.log('Order ID from client: ', id)

    const { data: order, isLoading, isError } = useGetOrderByIdQuery(id)
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Failed to load order details!</div>

    if (!id) {
        return (
            <MainLayout>
                <Empty description="Order ID không hợp lệ hoặc không có." />
            </MainLayout>
        )
    }

    if (!order) {
        return (
            <MainLayout>
                <Empty description="No order found" />
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            <div style={{ maxWidth: 800, margin: '20px auto' }}>
                <Card
                    title={`Order ID: ${order._id}`}
                    style={{ marginBottom: '20px' }}
                >
                    <Title level={4}>Customer Information</Title>
                    <Text>Name: {(order.user as any).name}</Text>
                    <br />
                    <Text>Phone: {(order.user as any).phone}</Text>
                    <br />
                    <Text>Phone 2: {(order.user as any).phone}</Text>
                    <br />
                    <Text>Phone 3: {(order.user as any).phone}</Text>
                    <Divider />
                    <Title level={4}>Shipping Address</Title>
                    <Text>{`${order.shippingAddress.address}, ${order.shippingAddress.ward}, ${order.shippingAddress.district}, ${order.shippingAddress.province}`}</Text>
                    <Divider />
                    <Title level={4}>Order Items</Title>
                    <List
                        dataSource={order.orderItems}
                        renderItem={(item) => (
                            <List.Item key={item.product}>
                                <Text>{item.name}</Text> x{' '}
                                <Text>{item.quantity}</Text>
                            </List.Item>
                        )}
                    />
                    <Divider />
                    <Title level={4}>Payment Method</Title>
                    <Text>{order.paymentMethod}</Text>
                    <Divider />
                    <Title level={4}>Price Details</Title>
                    <Text>Items Price: {formatCurrency(order.itemsPrice)}</Text>
                    <br />
                    <Text>Tax Price: {order.taxPrice.toFixed(2)} VND</Text>
                    <br />
                    <Text>
                        Shipping Price: {order.shippingPrice.toFixed(2)} VND
                    </Text>
                    <br />
                    <Text>Total Price: {order.totalPrice.toFixed(2)} VND</Text>
                    <Divider />
                    <Title level={4}>Status</Title>
                    <Text>
                        {order.isPaid
                            ? `Paid on ${dayjs(order.paidAt).format(
                                  'YYYY-MM-DD'
                              )}`
                            : 'Pending Payment'}
                    </Text>
                    <br />
                    <Text>
                        {order.isDelivered
                            ? `Delivered on ${dayjs(order.deliveredAt).format(
                                  'YYYY-MM-DD'
                              )}`
                            : 'Not Delivered'}
                    </Text>
                </Card>
                <Button type="primary" onClick={() => window.history.back()}>
                    Back to Orders
                </Button>
            </div>
        </MainLayout>
    )
}

export default OrderDetailsPage
