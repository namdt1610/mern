import React from 'react'
import { HomeLayout } from '@/components/client/layouts/HomeLayout'
import { Home } from '@/features/client/home/Home'

export default function HomePage() {
    return (
        <HomeLayout>
            <Home />
        </HomeLayout>
    )
}
