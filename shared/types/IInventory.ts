import { IWarehouse } from './IWarehouse';
import { Product } from './Product'

export interface IInventory {
    _id: string
    product: Product
    quantity: number
    warehouse: IWarehouse
    status: string
    createdAt: Date
    updatedAt: Date
}
