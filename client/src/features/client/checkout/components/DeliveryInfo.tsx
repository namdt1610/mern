import React, { useState } from 'react'
import {
    Card,
    Form,
    Input,
    App,
    Flex,
    Radio,
    Select,
    Image,
    Button,
} from 'antd'
import { useCheckOut } from '../hooks/useCheckOut'
import { ICart, CartDetails } from '@/types/ICart'
import MainLayout from '@/components/client/layouts/MainLayout'
import LoadingError from '@/components/shared/LoadingError'

export default function DeliveryInfo({
    userId,
    cart,
}: {
    userId: string | undefined
    cart: ICart | undefined
}) {
    const { message } = App.useApp()

    const {
        createOrder,
        isLoading,
        error,
        banks,
        errorBanks,
        isBanksLoading,
        provinces,
        errorProvinces,
        isProvinceLoading,
    } = useCheckOut()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [form] = Form.useForm()
    const [paymentMethod, setPaymentMethod] = useState<string>('COD')
    const [qrCode, setQrCode] = useState<string | null>(null)
    const [bankCode, setBankCode] = useState<string | null>(null)
    const [amount, setAmount] = useState<number>(0)

    const [selectedProvince, setSelectedProvince] = useState<string | null>(
        null
    )
    const [districts, setDistricts] = useState<any[]>([])
    const [wards, setWards] = useState<any[]>([])

    //! Debug
    // console.log(banks)
    // console.log(provinces)

    if (!banks || !provinces) {
        return (
            <MainLayout>
                <LoadingError
                    isLogin={true}
                    isError={error !== undefined}
                    isLoading={isBanksLoading}
                    refetch={undefined}
                    title={'Tải thất bại'}
                />
            </MainLayout>
        )
    }

    const handleProvinceChange = (value: string) => {
        const province = provinces.find((p: any) => p.name === value)
        setSelectedProvince(value)
        setDistricts(province?.districts || [])
        setWards([]) // Reset phường/xã khi đổi tỉnh
        form.setFieldsValue({ district: null, ward: null }) // Xóa các lựa chọn quận/huyện và phường/xã
    }
    const handleDistrictChange = (value: string) => {
        const district = districts.find((d: any) => d.name === value)
        setWards(district?.wards || [])
        form.setFieldsValue({ ward: null }) // Xóa lựa chọn phường/xã
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

        const itemsPrice = cart!.products.reduce(
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
                price: item.product.price,
                product: item.product._id,
            }))
            console.log('orderItems:', orderItems)

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
            message.success('Place order successfully!')
            setIsSubmitting(false)
        } catch (error: any) {
            message.error(error?.data?.message || 'Failed to place order!')
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
