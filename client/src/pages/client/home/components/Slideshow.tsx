import React, { useState, useEffect } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

const slides = [
    {
        image: '/img/slide1.webp',
        title: 'New Arrivals',
        description: 'Discover our latest collection of books',
        color: 'from-blue-600/50',
    },
    {
        image: '/img/slide2.webp',
        title: 'Best Sellers',
        description: 'Most popular books this month',
        color: 'from-purple-600/50',
    },
    {
        image: '/img/slide3.jpg',
        title: 'Special Offers',
        description: 'Up to 50% off on selected titles',
        color: 'from-red-600/50',
    },
]

export default function Slideshow() {
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    }

    return (
        <div className="relative h-[400px] md:h-[500px] overflow-hidden">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute w-full h-full transition-all duration-700 ease-in-out transform ${
                        index === currentSlide
                            ? 'translate-x-0 opacity-100'
                            : 'translate-x-full opacity-0'
                    }`}
                >
                    <div className="relative w-full h-full">
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                        />
                        {/* Gradient Overlay */}
                        <div
                            className={`absolute inset-0 bg-gradient-to-r ${slide.color} to-transparent opacity-80`}
                        />

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fadeIn">
                                {slide.title}
                            </h2>
                            <p className="text-xl md:text-2xl text-white mb-8 animate-slideUp">
                                {slide.description}
                            </p>
                            <button
                                className="w-fit px-8 py-3 bg-white text-gray-800 rounded-full font-semibold 
                                hover:bg-gray-100 transition-all duration-300 animate-slideUp"
                            >
                                Shop Now
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white/50 
                    rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300"
            >
                <LeftOutlined className="text-white text-lg" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white/50 
                    rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300"
            >
                <RightOutlined className="text-white text-lg" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 
                            ${
                                index === currentSlide
                                    ? 'w-8 bg-white'
                                    : 'bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}
