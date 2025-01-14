import React from 'react'
import Header from '../Header'
import Main from '../Main'
import Footer from '../Footer'
import BackToTop from '@/components/BackToTop'

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
