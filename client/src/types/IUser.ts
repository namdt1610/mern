export interface IUser {
    _id: string
    avatar?: string
    name: string
    username: string
    email: string
    password?: string
    role: string
    status?: string
    phone?: string
    address?: {
        province: string
        district: string
        ward: string
        address: string
    }
    createdAt: string
    updatedAt?: string
}
