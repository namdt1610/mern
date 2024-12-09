export interface Customer {
    _id: string // ID của khách hàng
    name: string // Tên khách hàng
    email: string // Email của khách hàng
    phone: string // Số điện thoại
    address: string // Địa chỉ của khách hàng
    createdAt: string // Ngày tạo khách hàng
    updatedAt: string // Ngày cập nhật thông tin khách hàng
    status: 'active' | 'inactive' // Trạng thái khách hàng (active / inactive)
}
