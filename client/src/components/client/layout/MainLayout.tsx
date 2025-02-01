import React from 'react'
import Header from '@/pages/client/home/components/Header'
import Main from '@/pages/client/home/components/Main'
import Footer from '@/pages/client/home/components/Footer'
import BackToTop from '@/components/shared/BackToTop'

interface StoreLayoutProps {
    children: React.ReactNode
}

const MainLayout: React.FC<StoreLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className=" mt-[74px]">
                <Main>{children}</Main>
            </main>
            <Footer />
            <BackToTop />
        </div>
    )
}

export default MainLayout
