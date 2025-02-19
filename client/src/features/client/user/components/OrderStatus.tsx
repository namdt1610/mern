import React from 'react'
import {
    Tabs,
    Card,
    Table,
    Button,
    List,
    Form,
    Input,
    Avatar,
    Result,
} from 'antd'
import { Link } from 'react-router-dom'
import MainLayout from '@/components/client/layouts/MainLayout'
import UserInfoCard from '@/components/admin/UserInfoCard'
import { useGetOrdersByUserIdQuery } from '@/services/OrderApi'
import { useUpdateUserMutation } from '@/services/UserApi'
import { formatCurrency } from '@/utils/formatCurrency'
import { getUserFromCookie } from '@/utils/useGetToken'

const { TabPane } = Tabs

export default function OrderStatus({ userId }: { userId: string }) {
    const { data: orders = [], isLoading } = useGetOrdersByUserIdQuery(userId!)
    console.log(orders)

    const columns = [
        { title: 'Order ID', dataIndex: '_id' },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Total',
            dataIndex: 'totalPrice',
            render: (price: number) => formatCurrency(price),
        },
        {
            title: 'Status',
            render: (record: any) => (
                <span>
                    {record.isPaid ? 'Paid' : 'Pending'} |
                    {record.isDelivered ? 'Delivered' : 'Shipping'}
                </span>
            ),
        },
        {
            title: 'Action',
            render: (record: any) => (
                <Link to={`/order/${record._id}`}>
                    <Button type="link">View Details</Button>
                </Link>
            ),
        },
    ]

    return (
        <Table
            loading={isLoading}
            columns={columns}
            dataSource={orders}
            rowKey="_id"
        />
    )
}
