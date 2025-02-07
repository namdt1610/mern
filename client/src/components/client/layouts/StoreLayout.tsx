import React, { useState } from 'react'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import MainContent from '@/pages/client/store/BookList'
import BackToTop from '@/components/shared/BackToTop'
import Sidebar from './StoreSidebar'
import StoreRightSidebar from './StoreRightSidebar'

export default function StoreLayout() {
    const [selectedCategory, setSelectedCategory] = useState<
        string | undefined
    >()

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category)
    }
    return (
        <div className="bg-gradient-to-r from-gray-200 via-gray-100 to-white min-h-screen flex flex-col">
            <Header />
            <div className="flex pt-[74px]">
                <Sidebar onCategoryChange={handleCategoryChange} />
                <main className="px-4 flex-grow">
                    <MainContent selectedCategory={selectedCategory} />
                </main>
                <StoreRightSidebar />
            </div>
            <Footer />
            <BackToTop />
        </div>
    )
}
