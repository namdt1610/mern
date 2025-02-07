import React, { Suspense } from 'react'
import {
    Hero,
    MainContent,
    SubContent,
    HeroSkeleton,
    MainContentSkeleton,
    SubContentSkeleton,
} from '@/features/client/home'

export const Home = () => {
    return (
        <div>
            <Suspense fallback={<HeroSkeleton />}>
                <Hero />
            </Suspense>
            <Suspense fallback={<MainContentSkeleton />}>
                <MainContent />
            </Suspense>
            <Suspense fallback={<SubContentSkeleton />}>
                <SubContent />
            </Suspense>
        </div>
    )
}
