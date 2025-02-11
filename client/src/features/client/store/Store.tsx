import React, { Suspense } from 'react'
import { ProductList } from '.'
import { Skeleton } from 'antd'

export const Store = () => {
    return (
        <>
            <Suspense fallback={<Skeleton active />}>
                <ProductList />
            </Suspense>
        </>
    )
}
