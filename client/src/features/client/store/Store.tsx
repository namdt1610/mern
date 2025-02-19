import React, { Suspense } from 'react'
import { ProductList } from '.'
import { Skeleton } from 'antd'
import ErrorBoundary from '@/components/shared/ErrorBoudaries'

export const Store = () => {
    return (
        <ErrorBoundary>
            <Suspense fallback={<Skeleton active />}>
                <ProductList />
            </Suspense>
        </ErrorBoundary>
    )
}
