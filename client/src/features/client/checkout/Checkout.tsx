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
import { useGetCart } from './hooks/useGetCart'
import { useCheckOut } from './hooks/useCheckOut'
import { useCreateOrderMutation } from '@/services/OrderApi'
import { useGetPaymentMethodsQuery } from '@/services/PaymentMethodApi'
import { useGetBanksQuery } from '@/services/VietQrApi'
import { CartDetails } from '@shared/types/ICart'
import LoadingError from '@/components/shared/LoadingError'
import MainLayout from '@/components/client/layouts/MainLayout'
import { useGetProvincesQuery } from '@/services/OpenApi'
import CartInfo from './components/CartInfo'
import DeliveryInfo from './components/DeliveryInfo'

const CheckoutPage: React.FC = () => {
    const { userId, cart } = useGetCart()
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
    console.log(provinces)

    if (!cart) {
        return (
            <MainLayout>
                <LoadingError
                    isLogin={userId !== ''}
                    isError={error}
                    isLoading={isLoading}
                    refetch={undefined}
                    title={'Tải đơn hàng thất bại'}
                />
            </MainLayout>
        )
    }

    if (!banks || !provinces) {
        return (
            <MainLayout>
                <LoadingError
                    isLogin={userId !== ''}
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

    return (
        <MainLayout>
            <div style={{ maxWidth: 800, margin: '20px auto' }}>
                <CartInfo cart={cart} />
                <DeliveryInfo />
            </div>
        </MainLayout>
    )
}

export default CheckoutPage
