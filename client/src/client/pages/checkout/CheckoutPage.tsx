import React, { useState, useMemo } from 'react'
import {
    Form,
    Input,
    Button,
    Card,
    List,
    Divider,
    Typography,
    Select,
    Radio,
    message,
    Flex,
    Image,
} from 'antd'
import { useGetUserIdFromCookie } from '@/utils/useGetToken'
import { useGetCartQuery } from '@/services/CartApi'
import { useCreateOrderMutation } from '@/services/OrderApi'
import { useGetPaymentMethodsQuery } from '@/services/PaymentMethodApi'
import { useGetBanksQuery } from '@/services/VietQrApi'
import { CartDetails } from '@shared/types/Cart'
import LoadingError from '@/components/LoadingError'
import MainLayout from '@/components/client/layout/MainLayout'

const CheckoutPage: React.FC = () => {
    const userId = useGetUserIdFromCookie()
    const { data: cart } = useGetCartQuery(userId!)
    const [createOrder, { isLoading, isError }] = useCreateOrderMutation()
    // const { data: paymentMethods } = useGetPaymentMethodsQuery()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { data: banks, error, isLoading: isBanksLoading } = useGetBanksQuery()

    const [form] = Form.useForm()
    const [paymentMethod, setPaymentMethod] = useState<string>('COD')
    const [qrCode, setQrCode] = useState<string | null>(null)
    const [bankCode, setBankCode] = useState<string | null>(null)
    const [amount, setAmount] = useState<number>(0)

    //! Debug
    // console.log(banks)

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

    if (!banks) {
        return (
            <MainLayout>
                <LoadingError
                    isLogin={userId !== ''}
                    isError={error !== undefined}
                    isLoading={isBanksLoading}
                    refetch={undefined}
                    title={'Tải danh sách ngân hàng thất bại'}
                />
            </MainLayout>
        )
    }

    const handlePaymentMethodChange = (e: any) => {
        setPaymentMethod(e.target.value)
        if (e.target.value === 'QRCode') {
            setAmount(cart?.totalPrice || 0)
            handleGenerateQrCode()
        }
    }

    const handleGenerateQrCode = async () => {
        console.log('Generate QR code:', amount)

        // if (amount <= 0) return

        const requestBody = {
            accountNo: '0764872970', // Số tài khoản
            accountName: 'DANG TRAN NAM', // Tên tài khoản
            acqId: '970422', // ID thu nhận
            addInfo: 'CHUYEN KHOAN QUA NGAN HANG', // Thông tin bổ sung
            amount: amount.toString(),
            template: 'print', // Loại template
        }

        try {
            const response = await fetch('https://api.vietqr.io/v2/generate', {
                method: 'POST',
                headers: {
                    'x-client-id': '<CLIENT_ID_HERE>', // Thay CLIENT_ID_HERE bằng ID của bạn
                    'x-api-key': '<API_KEY_HERE>', // Thay API_KEY_HERE bằng API key của bạn
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            })

            if (!response.ok) {
                throw new Error('Failed to generate QR code')
            }

            const result = await response.json()
            // console.log('response:', result.data.qrDataURL)
            setQrCode(result.data.qrDataURL)
            // console.log('QR Code: ', qrCode)

            message.success('Mã QR đã được tạo thành công!')
        } catch (err) {
            console.error('Error generating QR code:', err)
            message.error('Lỗi tạo mã QR. Vui lòng thử lại.')
        }
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
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleCheckout}
                    >
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
                            <Radio.Group onChange={handlePaymentMethodChange}>
                                <Radio value="{'COD'}">COD</Radio>
                                <Radio value={'QRCode'}>QR Code</Radio>
                                <Radio value={'Momo'}>Momo</Radio>
                                <Radio value={'ZaloPay'}>ZaloPay</Radio>
                                <Radio value={'VN Pay'}>VN Pay</Radio>
                                <Radio value={'Visa'}>Visa</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {form.getFieldValue('paymentMethod') === 'QRCode' && (
                            <Flex>
                                <h4>Mã QR của bạn:</h4>
                                {qrCode ? (
                                    <Image src={qrCode} alt="QR Code" />
                                ) : (
                                    <p>Invalid QR code string</p>
                                )}
                            </Flex>
                        )}
                        <div
                            className={`transition-all duration-500 overflow-hidden ${
                                form.getFieldValue('paymentMethod') === 'Visa'
                                    ? 'max-h-full opacity-100'
                                    : 'max-h-0 opacity-0'
                            }`}
                        >
                            <Form.Item
                                label="Chọn ngân hàng"
                                name="bankMethod"
                                rules={[
                                    {
                                        required:
                                            form.getFieldValue(
                                                'paymentMethod'
                                            ) === 'Visa',
                                        message: 'Vui lòng chọn ngân hàng!',
                                    },
                                ]}
                            >
                                <Select placeholder="Chọn ngân hàng">
                                    {banks.data.map((bank: any) => (
                                        <Select.Option
                                            key={bank.code}
                                            value={bank.code}
                                        >
                                            {bank.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    placeholder="Nhập số thẻ"
                                    prefix={<i className="fab fa-cc-visa"></i>}
                                    accept="number"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    placeholder="Nhập tên chủ thẻ"
                                    accept="text"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    placeholder="Nhập ngày hết hạn"
                                    accept="text"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    placeholder="Nhập mã CVV"
                                    accept="number"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input placeholder="Nhập OTP" accept="number" />
                            </Form.Item>
                        </div>

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
