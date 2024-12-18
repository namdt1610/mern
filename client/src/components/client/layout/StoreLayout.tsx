import React, {useState} from 'react'
import Header from '../Header'
import Main from '../Main'
import Footer from '../Footer'
import MainContent from '@/client/pages/store/BookList'
import BackToTop from '@/components/BackToTop'
import Sidebar from './StoreSidebar'

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
            <div className="flex flex-1">
                <Sidebar onCategoryChange={handleCategoryChange} />
                <main className="p-4">
                    <Main>
                        <MainContent selectedCategory={selectedCategory} />
                    </Main>
                </main>
            </div>
            <Footer />
            <BackToTop />
        </div>
    )
}
