import React, { Suspense } from 'react'
import { Result, Skeleton } from 'antd'
import { CartInfo, DeliveryInfo } from '.'
import { useGetCart } from './hooks/useGetCart'
import { getUserFromCookie } from '@/utils/useGetToken'
import ErrorBoundary from '@/components/shared/ErrorBoudaries'
import LoadingError from '@/components/shared/LoadingError'

const CheckoutPage: React.FC = () => {
    const userId = getUserFromCookie()?._id || ''
    const { cart, isLoading, error, refetch } = useGetCart(userId)

    if (isLoading || error || !userId)
        return LoadingError({
            title: 'There was an error',
            isLogin: !!userId,
            isLoading,
            isError: error,
            refetch: refetch,
        })

    if (!cart)
        return <Result status="404" title="404" subTitle="Cart not found" />

    return (
        <ErrorBoundary>
            <div style={{ maxWidth: 800, margin: '20px auto' }}>
                <Suspense fallback={<Skeleton active />}>
                    <CartInfo cart={cart} isLoading={isLoading} error={error} />
                </Suspense>
                <Suspense fallback={<Skeleton active />}>
                    <DeliveryInfo userId={userId} cart={cart} />
                </Suspense>
            </div>
        </ErrorBoundary>
    )
}

export default CheckoutPage
