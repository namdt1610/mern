import mongoose, { Document, Schema } from 'mongoose'

// Định nghĩa interface cho Customer
export interface ICustomer extends Document {
    name: string
    email: string
    phone: string
    address: string
    status: 'active' | 'inactive'
}

// Định nghĩa schema cho Customer
const customerSchema: Schema<ICustomer> = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, // Kiểm tra định dạng email hợp lệ
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
    },
    {
        timestamps: true, // Tự động thêm `createdAt` và `updatedAt`
    }
)

// Tạo model Customer từ schema
const Customer = mongoose.model<ICustomer>('Customer', customerSchema)

export default Customer
