import React, { ReactNode } from 'react'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import BackToTop from '@/components/shared/BackToTop'

interface HomeLayoutProps {
    children: ReactNode
}

export const HomeLayout = ({ children }: HomeLayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main>{children}</main>
            <Footer />
            <BackToTop />
        </div>
    )
}
