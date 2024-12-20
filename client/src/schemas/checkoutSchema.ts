import { z } from 'zod'

export const checkoutSchema = z.object({
    name: z.string().min(1, 'Họ và tên là bắt buộc'),
    phone: z.string().regex(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ'),
    province: z.string().min(1, 'Vui lòng chọn tỉnh/thành phố'),
    district: z.string().min(1, 'Vui lòng chọn quận/huyện'),
    ward: z.string().min(1, 'Vui lòng chọn phường/xã'),
    address: z.string().min(1, 'Địa chỉ là bắt buộc'),
    paymentMethod: z.string().min(1, 'Phương thức thanh toán là bắt buộc'),
    bankMethod: z.string().optional(),
})
