// interfaces/User.ts
export interface User {
    _id: string
    avatar: string
    name: string
    email: string
    password?: string
    role: string
    status: string
    phone?: string
    address?: string
    createdAt: string
    updatedAt: string
}

export interface CreateUserRequest {
    username: string
    email: string
    password: string
    role?: string
}