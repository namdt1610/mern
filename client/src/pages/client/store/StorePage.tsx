import React from 'react'
import StoreLayout from '@/components/client/layouts/StoreLayout'
import { Store } from '@/features/client/store/Store'

export default function StorePage() {
    return (
        <StoreLayout>
            <Store />
        </StoreLayout>
    )
}
