import React from 'react'
import { Card, List, Typography, Divider } from 'antd'
import { ICart } from '@shared/types/ICart'

export default function CartInfo({ cart }: { cart: ICart }) {
    return (
        <Card title="Cart information" bordered={false}>
            <List
                dataSource={cart.products}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.product.name}
                            description={`Số lượng: ${item.quantity}`}
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
                    Tổng tiền: {cart.totalPrice} VND
                </Typography.Title>
            </div>
        </Card>
    )
}
