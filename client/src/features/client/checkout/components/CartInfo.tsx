import React from 'react'
import { Card, List, Typography, Divider, Skeleton, Result } from 'antd'
import { useGetCart } from '../hooks/useGetCart'
import { ICart } from '@/types/ICart'

export default function CartInfo({
    cart,
    isLoading,
    error,
}: {
    cart: ICart | undefined
    isLoading: boolean
    error: any
}) {
    if (!cart)
        return <Result status="404" title="404" subTitle="Cart not found" />
    if (isLoading) return <Skeleton active />
    if (error)
        return (
            <Result
                status="500"
                title="500"
                subTitle="Sorry, something went wrong."
            />
        )

    return (
        <Card title="Cart information" bordered={false}>
            <List
                dataSource={cart.products}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.product.name}
                            description={`Quantities: ${item.quantity}`}
                        />
                        <Typography.Text>
                            {item.product.price} VND
                        </Typography.Text>
                    </List.Item>
                )}
            />
            <Divider />
            <div>
                <Typography.Title level={4}>
                    Total: {cart.totalPrice} VND
                </Typography.Title>
            </div>
        </Card>
    )
}
