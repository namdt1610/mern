import React, { Suspense } from 'react'
import {
    Hero,
    MainContent,
    SubContent,
    HeroSkeleton,
    MainContentSkeleton,
    SubContentSkeleton,
} from './index'

export const Home = () => {
    return (
        <>
            <Suspense fallback={<HeroSkeleton />}>
                <Hero />
            </Suspense>
            <Suspense fallback={<MainContentSkeleton />}>
                <MainContent />
            </Suspense>
            <Suspense fallback={<SubContentSkeleton />}>
                <SubContent />
            </Suspense>
        </>
    )
}
