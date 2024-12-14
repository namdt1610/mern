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
        <div className="bg-gradient-to-r from-gray-200 via-gray-100 to-white min-h-screen flex flex-col">
            <Header />
            <main className="">
                <Main>{children}</Main>
            </main>
            <Footer />
            <BackToTop />
        </div>
    )
}

export default MainLayout
