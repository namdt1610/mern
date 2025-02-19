import React from 'react'
import { Table, Button, Empty, InputNumber, Typography, Flex, App } from 'antd'
import { BackwardOutlined, DeleteOutlined } from '@ant-design/icons'
import MainLayout from '@/components/client/layouts/MainLayout'

const { Title, Text } = Typography

export interface CartItem {
    key: string
    name: string
    price: number
    quantity: React.ReactNode
    remove: React.ReactNode
}

interface CartUIProps {
    dataSource: CartItem[]
    totalQuantity: number
    totalPrice: number
    nav: (path: string) => void
}

const CartUI: React.FC<CartUIProps> = ({
    dataSource,
    totalQuantity,
    totalPrice,
    nav,
}) => {
    const { message } = App.useApp()
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Remove',
            dataIndex: 'remove',
            key: 'remove',
        },
    ]

    return (
        <div className="mt-[74px] p-[24px]">
            <Title level={4}>Your Cart</Title>
            {dataSource && dataSource.length > 0 ? (
                <>
                    <Table dataSource={dataSource} columns={columns} />
                    <Title level={4}>Total</Title>
                    <Flex vertical style={{ paddingLeft: '80%' }}>
                        <Text>Total quantity: {totalQuantity}</Text>
                        <Text>Total price: ${totalPrice}</Text>
                    </Flex>
                </>
            ) : (
                <Empty description="Your cart is empty, let's shopping and put something here ^^">
                    <Button onClick={() => nav('/books')}>
                        Back To Shopping
                    </Button>
                </Empty>
            )}
            <Button
                icon={<DeleteOutlined />}
                type="primary"
                onClick={() => nav('/checkout')}
            >
                Checkout
            </Button>
            <Button
                icon={<BackwardOutlined />}
                type="primary"
                style={{ marginTop: '16px' }}
                onClick={() => nav('/products')}
            >
                Back to Products
            </Button>
        </div>
    )
}

export default CartUI
