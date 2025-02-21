import React, { Suspense } from 'react'
import { Button, Empty, Skeleton } from 'antd'
import { useProducts } from './hooks/useProducts'
import { ProductImage, ProductInfo, ProductReview } from '.'
import MainLayout from '@/components/client/layouts/MainLayout'
import ErrorBoundary from '@/components/shared/ErrorBoudaries'

export default function ProductDetails() {
    const { userId, product, isLoading, refetch, stock, favorites } =
        useProducts()

    if (isLoading) return <Skeleton active />

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
        <ErrorBoundary>
            <Suspense fallback={<Skeleton active />}>
                <ProductImage product={product} />
            </Suspense>
            <Suspense fallback={<Skeleton active />}>
                <ProductInfo
                    userId={userId}
                    product={product}
                    stock={stock}
                    favorites={favorites}
                />
            </Suspense>
            <Suspense fallback={<Skeleton active />}>
                <ProductReview userId={userId} productId={product._id} />
            </Suspense>
        </ErrorBoundary>
    )
}
