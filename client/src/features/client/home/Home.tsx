import React, { Suspense } from 'react'
import {
    Hero,
    MainContent,
    SubContent,
    HeroSkeleton,
    MainContentSkeleton,
    SubContentSkeleton,
} from '.'
import ErrorBoundary from '@/components/shared/ErrorBoudaries'

export const Home = () => {
    return (
        <ErrorBoundary>
            <Suspense fallback={<HeroSkeleton />}>
                <Hero />
            </Suspense>
            <Suspense fallback={<MainContentSkeleton />}>
                <MainContent />
            </Suspense>
            <Suspense fallback={<SubContentSkeleton />}>
                <SubContent />
            </Suspense>
        </ErrorBoundary>
    )
}
