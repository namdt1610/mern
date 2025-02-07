import React, { FC } from 'react'

interface SlideProps {
    image: string
    title: string
    description: string
    color: string
    isActive: boolean
}

export const Slide: FC<SlideProps> = ({
    image,
    title,
    description,
    color,
    isActive,
}) => {
    return (
        <div
            className={`absolute w-full h-full transition-all duration-700 ease-in-out transform 
                ${
                    isActive
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-full opacity-0'
                }`}
        >
            <div className="relative w-full h-full">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />

                {/* Gradient Overlay */}
                <div
                    className={`absolute inset-0 bg-gradient-to-r ${color} to-transparent opacity-80`}
                />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fadeIn">
                        {title}
                    </h2>
                    <p className="text-xl md:text-2xl text-white mb-8 animate-slideUp">
                        {description}
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
    )
}
