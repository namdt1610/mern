import React, { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { useGetProductByIdQuery } from '@/services/ProductApi'
import { getUserFromCookie } from '@/utils/useGetToken'
import { useGetFavoritesQuery } from '@/services/UserApi'
import { useGetInventoryByProductIdQuery } from '@/services/InventoryApi'
import { Button, Empty, Spin } from 'antd'
import { ProductImage, ProductInfo, ProductReview } from '.'
import MainLayout from '@/components/client/layouts/MainLayout'

export const ProductDetails: React.FC = () => {
    const userId = getUserFromCookie()?._id ?? ''
    const productId = useParams<{ productId: string }>().productId ?? ''

    // Fetch API
    const {
        data: product,
        refetch,
        isLoading,
    } = useGetProductByIdQuery(productId!, {
        skip: !productId,
    })
    const { data: stock } = useGetInventoryByProductIdQuery(productId!, {
        skip: !productId,
    })
    const { data: favorites } = useGetFavoritesQuery(userId!, { skip: !userId })

    if (isLoading) return <Spin />

    if (!product) {
        return (
            <MainLayout>
                <Empty description={'Cannot find product'}>
                    <Button onClick={refetch}>Reload</Button>
                </Empty>
            </MainLayout>
        )
    }

    return (
        <>
            <Suspense fallback={<Spin />}>
                <ProductImage product={product} />
            </Suspense>
            <Suspense fallback={<Spin />}>
                <ProductInfo
                    userId={userId}
                    product={product}
                    stock={stock}
                    favorites={favorites}
                />
            </Suspense>
            <Suspense fallback={<Spin />}>
                <ProductReview userId={userId} productId={product._id} />
            </Suspense>
        </>
    )
}
