import React from 'react'
import { Link } from 'react-router-dom'
import Slideshow from '../../components/Slideshow'
import { images, bannerSideImages } from './import'
import Featured from './Featured'
import Links from './Links'
import Categories from './Categories'

function Home() {
    return (
        <>
            {/* Welcome Section */}
            <div className="welcome-section border">
                <div className="content m-4 flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold">
                        Welcome to New Balance Outlet Store
                    </h1>
                    <p className="">Sale up to 50% for all products</p>
                    <Link className="btn-primary uppercase" to="/store">
                        Shop Now
                    </Link>
                </div>
            </div>
            {/* Hero Section */}
            <div className="hero-section border">
                <div className="hero-2-image">
                    <img
                        className="object-cover w-full h-full"
                        loading="lazy"
                        src="./img/574.gif"
                        alt=""
                    />
                </div>
                <div className="hero-2-content flex flex-col items-center justify-center my-10">
                    <h1 className="text-4xl font-bold">New Balance 574</h1>
                    <p className="">
                        New Balance 574 is the most iconic sneaker in the New
                        Balance family. The 574 is a clean and classic die cut
                        EVA runner that utilizes ENCAP cushioning technology.
                    </p>
                    <Link className="btn-primary uppercase" to="/574">
                        Shop Now
                    </Link>
                </div>
            </div>
            {/* Links Section */}
            <Links />
            {/* Main Content */}
            <div className="container mx-auto">
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
                <div className="hero-2-section my-4">
                    <div className="hero-content flex flex-col items-center justify-center h-dvh">
                        <div className="video-container relative w-full h-full">
                            <video
                                loading="lazy"
                                className="absolute top-0 left-0 w-full h-full sm:object-cover rounded-xl"
                                src="/videos/hero_nb574.mp4"
                                type="video/mp4"
                                autoPlay
                                loop
                                muted
                            ></video>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
