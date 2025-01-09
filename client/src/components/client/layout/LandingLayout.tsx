import React from 'react'
import Header from '../Header'
import Main from '../Main'
import Footer from '../Footer'
import Hero from '../Hero'
import MainContent from '../MainContent'
import Content from '../Content'
import BackToTop from '@/components/BackToTop'
import Slideshow from '../Slideshow'

export default function LandingLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <Main>
                <Hero />
                <Slideshow />
                <Content />
                <MainContent />
            </Main>
            <Footer />
            <BackToTop />
        </div>
    )
}
