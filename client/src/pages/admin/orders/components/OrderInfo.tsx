import React from 'react'
import { Badge, Card, Descriptions, Space, Tag, Typography } from 'antd'
import { User } from '@shared/types/User'
import { Order } from '@/types/Order'

const { Title } = Typography

interface OrderInfoProps {
    order: Order
    getStatusColor: (status: string) => string
}

export default function OrderInfo({ order, getStatusColor }: OrderInfoProps) {
    return (
        <Card
            title={<Title level={4}>Order #{order._id}</Title>}
            className="shadow-sm"
        >
            <Descriptions bordered column={2}>
                <Descriptions.Item
                    label={<span className="font-semibold">Customer</span>}
                    span={2}
                >
                    <Space direction="vertical">
                        <span>{(order.user as unknown as User).name}</span>
                        <span className="text-gray-500">
                            {(order.user as unknown as User).email}
                        </span>
                    </Space>
                </Descriptions.Item>

                <Descriptions.Item
                    label={<span className="font-semibold">Order Date</span>}
                >
                    {order.createdAt
                        ? new Date(order.createdAt).toLocaleString()
                        : 'N/A'}
                </Descriptions.Item>

                <Descriptions.Item
                    label={<span className="font-semibold">Status</span>}
                >
                    <Badge
                        status="processing"
                        color={getStatusColor(order.status ?? '')}
                        text={
                            <span className="capitalize">{order.status}</span>
                        }
                    />
                </Descriptions.Item>

                <Descriptions.Item
                    label={
                        <span className="font-semibold">Shipping Address</span>
                    }
                    span={2}
                >
                    {order.shippingAddress?.address}
                    <br />
                    {order.shippingAddress?.ward}
                    <br />
                    {order.shippingAddress?.district}
                    <br />
                    {order.shippingAddress?.province}
                </Descriptions.Item>

                <Descriptions.Item
                    label={
                        <span className="font-semibold">Payment Method</span>
                    }
                >
                    {order.paymentMethod}
                </Descriptions.Item>

                <Descriptions.Item
                    label={<span className="font-semibold">Total Amount</span>}
                >
                    <Tag color="green" className="text-lg">
                        ${order.totalPrice.toFixed(2)}
                    </Tag>
                </Descriptions.Item>
            </Descriptions>
        </Card>
    )
}
