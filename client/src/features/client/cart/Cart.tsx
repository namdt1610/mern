import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    useGetCartQuery,
    useUpdateCartItemMutation,
    useRemoveCartItemMutation,
} from '@/services/CartApi'
import { useLazyGetInventoryByProductIdQuery } from '@/services/InventoryApi'
import { getUserFromCookie } from '@/utils/useGetToken'
import { Button, InputNumber, Typography, Table, Empty } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import MainLayout from '@/components/client/layouts/MainLayout'

const { Text, Title } = Typography

const CartPage: React.FC = () => {
    const navigate = useNavigate()

    const user = getUserFromCookie()
    const userId = user ? user._id : ''
    const { data: cart, isLoading, isError, refetch } = useGetCartQuery(userId)
    const [updateCartItem] = useUpdateCartItemMutation()
    const [removeCartItem] = useRemoveCartItemMutation()

    // Sử dụng lazy query để gọi API kiểm tra kho cho từng sản phẩm
    const [getInventoryByIdTrigger] = useLazyGetInventoryByProductIdQuery()

    // State lưu danh sách sản phẩm không đủ hàng hoặc hết hàng
    const [unavailableItems, setUnavailableItems] = useState<string[]>([])

    useEffect(() => {
        if (userId) {
            refetch()
        }
    }, [userId, refetch])

    // Hàm kiểm tra tồn kho của sản phẩm so với số lượng trong giỏ hàng
    useEffect(() => {
        const checkStockAvailability = async () => {
            if (cart && cart.products && cart.products.length > 0) {
                const unavailable: string[] = []
                // Duyệt qua từng sản phẩm trong giỏ hàng
                await Promise.all(
                    cart.products.map(async (item) => {
                        // Kiểm tra nếu sản phẩm bị null thì bỏ qua hoặc đánh dấu là không hợp lệ
                        if (!item.product) return
                        try {
                            // Gọi API kiểm tra tồn kho cho sản phẩm theo id
                            const inventory = await getInventoryByIdTrigger(
                                item.product._id
                            ).unwrap()
                            // Giả sử inventory có thuộc tính quantity là số lượng hiện có
                            if (inventory.quantity < item.quantity) {
                                unavailable.push(item.product._id)
                            }
                        } catch (error) {
                            // Nếu có lỗi khi gọi API, coi như sản phẩm hiện không khả dụng
                            unavailable.push(item.product._id)
                        }
                    })
                )
                setUnavailableItems(unavailable)
            }
        }
        checkStockAvailability()
    }, [cart, getInventoryByIdTrigger])

    const handleUpdateQuantity = async (
        productId: string,
        quantity: number
    ) => {
        try {
            await updateCartItem({ userId, productId, quantity }).unwrap()
            refetch()
        } catch (error) {
            console.error('Failed to update cart item:', error)
        }
    }

    const handleRemoveFromCart = async (productId: string) => {
        try {
            await removeCartItem({ userId, productId }).unwrap()
            refetch()
        } catch (error) {
            console.error('Failed to remove item from cart:', error)
        }
    }

    if (isLoading || isError) {
        return <div>Loading or error...</div>
    }
    console.log('cart:', cart)

    if (!cart || !cart.products || cart.products.length === 0) {
        return (
            <MainLayout>
                <Empty
                    className="h-svh"
                    description="Your cart is empty, let's shop and add something here!"
                >
                    <Button
                        onClick={() => {
                            navigate('/books')
                        }}
                    >
                        Back To Shopping
                    </Button>
                </Empty>
            </MainLayout>
        )
    }

    const dataSource = cart.products.map((item, index) => {
        // Nếu item.product bị null, hiển thị thông báo sản phẩm không còn tồn tại
        if (!item.product) {
            return {
                key: `missing-${index}`,
                name: <Text type="danger">Sản phẩm không còn tồn tại</Text>,
                price: <Text type="danger">--</Text>,
                quantity: <Text type="danger">--</Text>,
                remove: (
                    <Button icon={<DeleteOutlined />} type="default" disabled>
                        Remove
                    </Button>
                ),
            }
        }

        return {
            key: item.product._id,
            name: item.product.name,
            price: item.product.price,
            quantity: (
                <>
                    <InputNumber
                        controls={true}
                        value={item.quantity}
                        disabled={unavailableItems.includes(item.product._id)}
                        onChange={(value) =>
                            handleUpdateQuantity(
                                item.product._id,
                                value as number
                            )
                        }
                    />
                    {unavailableItems.includes(item.product._id) && (
                        <Text type="danger" style={{ marginLeft: 8 }}>
                            Sản phẩm không đủ hàng hoặc hết hàng
                        </Text>
                    )}
                </>
            ),
            status: unavailableItems.includes(item.product._id)
                ? 'Out of stock'
                : 'Available',
            remove: (
                <Button
                    icon={<DeleteOutlined />}
                    type="default"
                    disabled={unavailableItems.includes(item.product._id)}
                    onClick={() => handleRemoveFromCart(item.product._id)}
                />
            ),
        }
    })

    return (
        <MainLayout>
            <div style={{ padding: '24px' }}>
                <Title level={4}>Your Cart</Title>
                <Table
                    dataSource={dataSource}
                    columns={[
                        { title: 'Name', dataIndex: 'name', key: 'name' },
                        { title: 'Price', dataIndex: 'price', key: 'price' },
                        {
                            title: 'Quantity',
                            dataIndex: 'quantity',
                            key: 'quantity',
                        },
                        { title: 'Status', dataIndex: 'status', key: 'status' },
                        { title: 'Remove', dataIndex: 'remove', key: 'remove' },
                    ]}
                    footer={() => (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontWeight: 'bold',
                            }}
                        >
                            <span>Total</span>
                            <span>{cart.totalPrice.toLocaleString()} VND</span>
                            <span>{cart.totalQuantity}</span>
                        </div>
                    )}
                />
                <Button
                    type="primary"
                    onClick={() => {
                        navigate(`/checkout/${userId}`)
                    }}
                >
                    Proceed to Checkout
                </Button>
            </div>
        </MainLayout>
    )
}

export default CartPage
