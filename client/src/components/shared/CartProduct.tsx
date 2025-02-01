import React from 'react'
import { Button, Card, Input, Typography } from 'antd'
const { Text } = Typography

interface CartProductProps {
    productId: string
    name: string
    price: number
    quantity: number
    onUpdateQuantity: (id: string, quantity: number) => void
    onRemove: (id: string) => void
}

const CartProduct: React.FC<CartProductProps> = ({
    productId,
    name,
    price,
    quantity,
    onUpdateQuantity,
    onRemove,
}) => {
    return (
        <Card
            style={{ marginBottom: '16px', padding: '8px' }}
            actions={[
                <Button type="text" onClick={() => onRemove(productId)} danger>
                    Remove
                </Button>,
            ]}
        >
            <Text strong>{name}</Text>
            <br />
            <Text>${price}</Text>
            <br />
            <Input
                type="number"
                value={quantity}
                onChange={(e) => onUpdateQuantity(productId, +e.target.value)}
                min={1}
                style={{ width: '60px', marginTop: '8px' }}
            />
        </Card>
    )
}

export default CartProduct
