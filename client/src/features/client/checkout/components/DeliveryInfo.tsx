import React from 'react'
import { Card, Form, Input } from 'antd'

export default function DeliveryInfo() {
    const handleCheckout = async () => {
        setIsSubmitting(true)
        const values = form.getFieldsValue()

        const itemsPrice = cart.products.reduce(
            (acc: any, item: any) => acc + item.product.price * item.quantity,
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
                price: ihtem.product.price,
                product: item.product._id,
            }))
            await createOrder({
                user: userId!,
                orderItems,
                shippingAddress: {
                    address: values.address,
                    ward: values.ward,
                    district: values.district,
                    province: values.province,
                },
                paymentMethod: values.paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
            }).unwrap()
            message.success('Đặt hàng thành công!')
            setIsSubmitting(false)
        } catch (error: any) {
            message.error(error?.data?.message || 'Đặt hàng thất bại!')
            console.error('Failed to checkout:', error)
        }
    }
    return (
        <Card title="Thông tin giao hàng" style={{ marginTop: 20 }}>
            <Form form={form} layout="vertical" onFinish={handleCheckout}>
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
                    label="Tỉnh/Thành phố"
                    name="province"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tỉnh/thành phố!',
                        },
                    ]}
                >
                    <Select
                        placeholder="Chọn tỉnh/thành phố"
                        onChange={handleProvinceChange}
                    >
                        {provinces.map((province: any) => (
                            <Select.Option
                                key={province.code}
                                value={province.name}
                            >
                                {province.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Quận/Huyện"
                    name="district"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập quận/huyện!',
                        },
                    ]}
                >
                    <Select
                        placeholder="Chọn quận/huyện"
                        onChange={handleDistrictChange}
                        disabled={!selectedProvince}
                    >
                        {districts.map((district: any) => (
                            <Select.Option
                                key={district.code}
                                value={district.name}
                            >
                                {district.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Phường/Xã"
                    name="ward"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập phường/xã!',
                        },
                    ]}
                >
                    <Select
                        placeholder="Chọn phường/xã"
                        disabled={wards.length === 0}
                    >
                        {wards.map((ward: any) => (
                            <Select.Option key={ward.code} value={ward.name}>
                                {ward.name}
                            </Select.Option>
                        ))}
                    </Select>
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
                            message: 'Vui lòng chọn phương thức thanh toán!',
                        },
                    ]}
                >
                    <Radio.Group onChange={handlePaymentMethodChange}>
                        <Radio value={'COD'}>COD</Radio>
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
                                    form.getFieldValue('paymentMethod') ===
                                    'Visa',
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
                        <Input placeholder="Nhập tên chủ thẻ" accept="text" />
                    </Form.Item>
                    <Form.Item>
                        <Input placeholder="Nhập ngày hết hạn" accept="text" />
                    </Form.Item>
                    <Form.Item>
                        <Input placeholder="Nhập mã CVV" accept="number" />
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
    )
}
