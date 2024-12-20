// components/CartDetail.tsx
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    useGetCartQuery,
    useUpdateCartItemMutation,
    useRemoveCartItemMutation,
} from '@/services/CartApi'
import { getUserFromCookie } from '@/utils/useGetToken'
import { Button, Empty, List, Typography, Table, InputNumber, Flex } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import MainLayout from '@/components/client/layout/MainLayout'
import LoadingError from '@/components/LoadingError'

const { Title, Text } = Typography

const CartPage: React.FC = () => {
    const user = getUserFromCookie()
    const userId = user ? user._id : ''
    const { data: cart, isLoading, isError, refetch } = useGetCartQuery(userId)
    const [updateCartItem] = useUpdateCartItemMutation()
    const [removeCartItem] = useRemoveCartItemMutation()
    const nav = useNavigate()

    useEffect(() => {
        if (userId) {
            refetch() // Load lại giỏ hàng khi userId thay đổi
        }
    }, [userId, refetch])

    const handleUpdateQuantity = async (
        userId: string,
        productId: string,
        quantity: number
    ) => {
        try {
            await updateCartItem({ userId, productId, quantity }).unwrap()
            refetch() // Reload cart after update
        } catch (error) {
            console.error('Failed to update cart item:', error)
        }
    }

    const handleRemoveFromCart = async (userId: string, productId: string) => {
        try {
            await removeCartItem({ userId, productId }).unwrap()
            refetch() // Reload cart after removal
        } catch (error) {
            console.error('Failed to remove item from cart:', error)
        }
    }

    if (isLoading || isError) {
        return (
            <MainLayout>
                <LoadingError
                    isLogin={userId !== ''}
                    isError={isError}
                    isLoading={isLoading}
                    refetch={refetch}
                    title={'Tải giỏ hàng thất bại'}
                />
            </MainLayout>
        )
    }

    const dataSource = cart?.products.map((product) => ({
        key: product.product._id,
        name: product.product.name,
        price: product.product.price,
        quantity: (
            <>
                <InputNumber
                    controls={true}
                    value={product.quantity}
                    onChange={(value) =>
                        handleUpdateQuantity(
                            userId,
                            product.product._id,
                            value as number
                        )
                    }
                />
            </>
        ),
        remove: (
            <Button
                icon={<DeleteOutlined />}
                type="default"
                onClick={() =>
                    handleRemoveFromCart(userId, product.product._id)
                }
            ></Button>
        ),
    }))

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
        <MainLayout>
            <div style={{ padding: '24px' }}>
                <Title level={4}>Your Cart</Title>

                {cart && cart.products.length > 0 ? (
                    <>
                        <Table
                            dataSource={dataSource}
                            columns={columns}
                        ></Table>
                        <Title level={4}>Total</Title>
                        <Flex vertical style={{ paddingLeft: '80%' }}>
                            <Text>Voucher:</Text>
                            <Text>Total quantity: {cart.totalQuantity}</Text>
                            <Text>Total price: ${cart.totalPrice}</Text>
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
                    type="primary"
                    onClick={() => nav(`/checkout/${userId}`)}
                >
                    Checkout
                </Button>
                <Button
                    type="primary"
                    style={{ marginTop: '16px' }}
                    onClick={() => nav('/products')} // Chuyển hướng về trang sản phẩm
                >
                    Back to Products
                </Button>
            </div>
        </MainLayout>
    )
}

export default CartPage
