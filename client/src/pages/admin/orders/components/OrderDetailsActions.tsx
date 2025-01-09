import React from 'react'
import { Button, Card, message, Space } from 'antd'
import { CheckOutlined, PrinterOutlined } from '@ant-design/icons'
import { useUpdateOrderStatusMutation } from '@/services/OrderApi'

interface OrderDetailsActionsProps {
    orderId: string
    isPaid: boolean
    isDelivered: boolean
    refetch: () => void
}

export default function OrderDetailsActions({
    orderId,
    isPaid,
    isDelivered,
    refetch,
}: OrderDetailsActionsProps) {
    const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation()

    const handleMarkAsPaid = async () => {
        try {
            await updateOrderStatus({ id: orderId, status: 'paid' }).unwrap()
            message.success('Order marked as paid')
            refetch()
        } catch (error) {
            message.error('Failed to update payment status')
        }
    }

    const handleMarkAsDelivered = async () => {
        try {
            await updateOrderStatus({
                id: orderId,
                status: 'delivered',
            }).unwrap()
            message.success('Order marked as delivered')
            refetch()
        } catch (error) {
            message.error('Failed to update delivery status')
        }
    }

    return (
        <Card title="Order Actions" className="mt-6 card-border">
            <Space direction="vertical" style={{ width: '100%' }}>
                {!isPaid && (
                    <Button
                        type="primary"
                        icon={<CheckOutlined />}
                        onClick={handleMarkAsPaid}
                        loading={isLoading}
                        block
                    >
                        Mark as Paid
                    </Button>
                )}

                {!isDelivered && (
                    <Button
                        type="primary"
                        icon={<CheckOutlined />}
                        onClick={handleMarkAsDelivered}
                        loading={isLoading}
                        block
                    >
                        Mark as Delivered
                    </Button>
                )}
            </Space>
        </Card>
    )
}
