import React, { useState, useEffect } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Slide } from './Slide'
import { slides } from './data'

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
                <Slide
                    key={index}
                    {...slide}
                    isActive={index === currentSlide}
                />
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
