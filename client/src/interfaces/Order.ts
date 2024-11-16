export interface Order {
    _id: string
    name: string
    email: string
    address: string
    phone: string
    total: number
    createdAt: Date
    updatedAt: Date
    status: string
    products: {
        product: string
        quantity: number
    }[]
}
