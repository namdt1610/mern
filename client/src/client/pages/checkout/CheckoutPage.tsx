import React, { useState } from 'react'
import {
    Form,
    Input,
    Button,
    Card,
    List,
    Divider,
    Typography,
    Empty,
    Select,
    Radio,
} from 'antd'
import { useGetUserIdFromCookie } from '@/utils/useGetToken'
import { useGetCartQuery } from '@/services/CartApi'
import { useCreateOrderMutation } from '@/services/OrderApi'
import { useGetPaymentMethodsQuery } from '@/services/PaymentMethod'
import { Cart, CartDetails } from '@shared/types/Cart'
import LoadingError from '@/components/LoadingError'
import MainLayout from '@/components/client/layout/MainLayout'

const CheckoutPage: React.FC = () => {
    const userId = useGetUserIdFromCookie()
    const { data: cart } = useGetCartQuery(userId!)
    const [createOrder, { isLoading, isError }] = useCreateOrderMutation()
    const { data: paymentMethods } = useGetPaymentMethodsQuery()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [form] = Form.useForm()

    if (!cart) {
        return (
            <MainLayout>
                <LoadingError
                    isLogin={userId !== ''}
                    isError={isError}
                    isLoading={isLoading}
                    refetch={undefined}
                    title={'Tải đơn hàng thất bại'}
                />
            </MainLayout>
        )
    }

    const handleCheckout = async () => {
        setIsSubmitting(true)
        const values = form.getFieldsValue()
        const {
            name,
            phone,
            address,
            city,
            postalCode,
            country,
            paymentMethod,
            bankMethod,
        } = values

        const itemsPrice = cart.products.reduce(
            (acc, item) => acc + item.product.price * item.quantity,
            0
        )
        const taxPrice = itemsPrice * 0.1 // Ví dụ 10% thuế
        const shippingPrice = 50 // Giả định giá ship cố định
        const totalPrice = itemsPrice + taxPrice + shippingPrice // Tổng cộng
        // Gửi request checkout đến server
        try {
            const orderItems = cart!.products.map((item: CartDetails) => ({
                name: item.product.name,
                quantity: item.quantity,
                image: item.product.imageUrl || '',
                price: item.product.price,
                product: item.product._id,
            }))
            await createOrder({
                user: userId!,
                orderItems,
                shippingAddress: {
                    address: values.address,
                    city: values.city,
                    postalCode: values.postalCode,
                    country: values.country,
                },
                paymentMethod: values.paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
            })
        } catch (error) {
            console.error('Failed to checkout:', error)
        }
    }

    return (
        <MainLayout>
            <div style={{ maxWidth: 800, margin: '20px auto' }}>
                <Card title="Thông tin giỏ hàng" bordered={false}>
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

                <Card title="Thông tin giao hàng" style={{ marginTop: 20 }}>
                    <Form layout="vertical" onFinish={handleCheckout}>
                        <Form.Item
                            label="Họ và tên"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập họ và tên!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập số điện thoại!',
                                },
                                {
                                    pattern: /^[0-9]{10}$/,
                                    message: 'Số điện thoại không hợp lệ!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Địa chỉ giao hàng"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập địa chỉ!',
                                },
                            ]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item
                            label="Chọn phương thức thanh toán"
                            name="paymentMethod"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Vui lòng chọn phương thức thanh toán!',
                                },
                            ]}
                        >
                            <Form.Item>
                                <Radio.Group>
                                    <Radio value="COD">COD</Radio>
                                    <Radio value="BankTransfer">
                                        Chuyển khoản
                                    </Radio>
                                </Radio.Group>
                            </Form.Item>
                            {form.getFieldValue('paymentMethod') ===
                                'BankTransfer' && (
                                <Select placeholder="Chuyển khoản ngân hàng">
                                    {paymentMethods?.map((method) => (
                                        <Select.Option
                                            key={method._id}
                                            value={method._id}
                                        >
                                            {method.name}
                                        </Select.Option>
                                    ))}
                                    Chọn phương thức thanh toán
                                </Select>
                            )}
                        </Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            disabled={isSubmitting}
                        >
                            Xác nhận thanh toán
                        </Button>
                    </Form>
                </Card>
            </div>
        </MainLayout>
    )
}

export default CheckoutPage
