import React from 'react'
import Header from '../Header'
import Main from '../Main'
import Footer from '../Footer'
import Hero from '../Hero'
import MainContent from '../MainContent'
import Content from '../Content'

export default function LandingLayout() {
    return (
        <div className="bg-gradient-to-r from-gray-200 via-gray-100 to-white min-h-screen flex flex-col">
            <Header />
            <Main>
                <Hero />
                <MainContent />
                <Content />
            </Main>
            <Footer />
        </div>
    )
}
