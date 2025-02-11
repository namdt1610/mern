import { lazy } from 'react'
export const Hero = lazy(() => import('./components/Hero/Hero'))
export const MainContent = lazy(() => import('./components/MainContent'))
export const SubContent = lazy(() => import('./components/SubContent'))
export const HeroSkeleton = lazy(() => import('./components/_skeletons/HeroSkeleton'))
export const MainContentSkeleton = lazy(() => import('./components/_skeletons/MainContentSkeleton'))
export const SubContentSkeleton = lazy(() => import('./components/_skeletons/SubContentSkeleton'))

