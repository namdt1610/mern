import React from 'react'
import { Button, Card, Space, Table } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import {
    useDeletePaymentMethodMutation,
    useGetPaymentMethodsQuery,
} from '@/services/PaymentMethodApi'
import { PaymentMethod } from '@/types/PaymentMethod'

const PaymentMethods: React.FC = () => {
    const { data: paymentMethods, isLoading } = useGetPaymentMethodsQuery()
    const [deletePaymentMethod] = useDeletePaymentMethodMutation()

    const columns = [
        {
            title: 'Payment Method',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Date Added',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: PaymentMethod) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        type="primary"
                        onClick={() => handleEdit(record._id)}
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => handleDelete(record._id)}
                    />
                </Space>
            ),
        },
    ]

    const handleEdit = (id: string) => {
        // Implement edit functionality
        console.log('Edit payment method:', id)
    }

    const handleDelete = async (id: string) => {
        try {
            await deletePaymentMethod(id)
        } catch (error) {
            console.error('Error deleting payment method:', error)
        }
    }

    return (
        <div style={{ padding: '24px' }}>
            <Card
                title="Payment Methods"
                extra={<Button type="primary">Add Payment Method</Button>}
            >
                <Table
                    columns={columns}
                    dataSource={paymentMethods}
                    rowKey="_id"
                    pagination={{ pageSize: 10 }}
                    loading={isLoading}
                />
            </Card>
        </div>
    )
}

export default PaymentMethods
