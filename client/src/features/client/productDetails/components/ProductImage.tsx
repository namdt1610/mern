import React from 'react'
import { Image } from 'antd'
import { IProduct } from '@/types/IProduct'

export default function ProductImage({ product }: { product: IProduct }) {
    return (
        <Image
            alt={product.name}
            src={`http://localhost:8888/uploads/${product.imageUrl}`}
        />
    )
}
