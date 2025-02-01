import React from 'react'
import Header from '../../../pages/client/home/components/Header'
import Main from '@/pages/client/home/components/Main'
import Footer from '../../../pages/client/home/components/Footer'
// import Hero from '../../../pages/client/home/components/Hero'
import Hero from '@/pages/client/home/components/Hero/Hero'
import MainContent from '@/pages/client/home/components/MainContent'
import Content from '../../../pages/client/home/components/Content'
import BackToTop from '@/components/shared/BackToTop'
import Slideshow from '@/pages/client/home/components/Slideshow'

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
