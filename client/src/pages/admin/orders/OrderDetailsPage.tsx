import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Result, Button } from 'antd'
import { useGetOrderByIdQuery } from '@/services/OrderApi'
import LoadingError from '@/components/shared/LoadingError'
import OrderHeader from './components/OrderHeader'
import OrderInfo from './components/OrderInfo'
import OrderItemsTable from './components/OrderItemsTable'
import OrderDetailsActions from './components/OrderDetailsActions'
import PrintableOrder from './components/PrintableOrder'

export default function OrderDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: order, isLoading, error, refetch } = useGetOrderByIdQuery(id!)

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return 'green'
            case 'pending':
                return 'gold'
            case 'cancelled':
                return 'red'
            default:
                return 'blue'
        }
    }

    if (isLoading || error) {
        return (
            <LoadingError
                isLoading={isLoading}
                isError={!!error}
                refetch={refetch}
                title="Order Details"
                isLogin={false}
            />
        )
    }

    if (!order) {
        return (
            <Result
                status="404"
                title="Order not found"
                subTitle="The order you are looking for does not exist."
                extra={
                    <Button
                        type="primary"
                        onClick={() => navigate('/admin/orders')}
                    >
                        Back to Orders
                    </Button>
                }
            />
        )
    }

    return (
        <div className="space-y-6">
            <OrderHeader onBack={() => navigate('/admin/orders')} />
            <OrderInfo order={order} getStatusColor={getStatusColor} />
            <OrderItemsTable items={order.orderItems} />
            <OrderDetailsActions
                orderId={order._id}
                isPaid={order.isPaid}
                isDelivered={order.isDelivered}
                refetch={refetch}
            />
            <PrintableOrder order={order} />
        </div>
    )
}
