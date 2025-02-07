import React from 'react'

const HeroSkeleton = () => {
    return (
        <div className="relative min-h-[600px] overflow-hidden px-14">
            <div className="container mx-auto px-4 py-[75px] relative">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column Skeleton */}
                    <div className="space-y-8">
                        {/* Title Skeleton */}
                        <div className="space-y-4">
                            <div className="h-12 bg-gray-200 rounded-lg w-3/4 animate-pulse" />
                            <div className="h-12 bg-gray-200 rounded-lg w-1/2 animate-pulse" />
                        </div>

                        {/* Description Skeleton */}
                        <div className="h-6 bg-gray-200 rounded-lg w-full animate-pulse" />

                        {/* Search Bar Skeleton */}
                        <div className="h-14 bg-gray-200 rounded-full w-full animate-pulse" />

                        {/* Quick Categories Skeleton */}
                        <div className="flex gap-4">
                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className="h-24 w-32 bg-gray-200 rounded-lg animate-pulse"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Featured Books Carousel Skeleton */}
                    <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="h-64 bg-gray-200 rounded-lg animate-pulse"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSkeleton