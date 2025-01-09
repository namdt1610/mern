import React from 'react'
import Slideshow from '../../../components/home/Slideshow'
import WelcomeSection from '../../../components/home/WelcomeSection'
import HeroSection from '../../../components/home/HeroSection'
import {bannerSideImages, images} from '../../../components/home/Imports'
import Featured from '../../../components/home/Featured'
import Links from '../../../components/home/Links'
import Categories from '../../../components/home/Categories'

function Home() {
    return (
        <>
            <WelcomeSection />
            <HeroSection />
            <Links />
            {/* Main Content */}
            <div className="mx-auto">
                {/* Banner Section */}
                <div className="banner-section rounded-xl my-4">
                    {/* Banner Slideshow and Side */}
                    <div className="grid grid-cols-3 grid-rows-2 gap-4 h-[36rem]">
                        {/* Banner Slideshow */}
                        <div className="banner-slideshow col-span-2 row-span-2 h-[36rem]">
                            <Slideshow images={images} />
                        </div>

                        {/* Banner Side */}
                        <div className="banner-side-1">
                            <img
                                className="rounded-xl object-cover w-full h-full"
                                src={bannerSideImages[0].imageUrl}
                                alt="banner-side-1"
                            />
                        </div>
                        <div className="banner-side-2">
                            <img
                                className="rounded-xl object-cover w-full h-full"
                                src={bannerSideImages[1].imageUrl}
                                alt="banner-side-2"
                            />
                        </div>
                    </div>
                </div>
                <Categories />
                <Featured />
                {/* Hero 2 Section */}
                <div className=" flex flex-col items-center justify-center w-auto h-screen relative">
                    <video
                        loading="lazy"
                        className="absolute  w-auto h-full object-cover rounded-xl"
                        src="/videos/hero_nb574.mp4"
                        type="video/mp4"
                        autoPlay
                        loop
                        muted
                    ></video>
                </div>
            </div>
        </>
    )
}

export default Home
