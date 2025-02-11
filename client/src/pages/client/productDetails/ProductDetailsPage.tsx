import React from 'react'
import MainLayout from '@/components/client/layouts/MainLayout'
import { ProductDetails } from '@/features/client/productDetails/ProductDetails'

export default function ProductDetailsPage() {
    return (
        <MainLayout>
            <ProductDetails />
        </MainLayout>
    )
}
