import React from 'react'
import { Button } from 'antd'

const MainContentSkeleton = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                {/* Filter Buttons Skeleton */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-4 mb-6">
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="h-9 w-24 bg-gray-200 rounded-full animate-pulse"
                            />
                        ))}
                    </div>
                </div>

                {/* Products Grid Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                        <div
                            key={item}
                            className="rounded-xl shadow-sm bg-white overflow-hidden"
                        >
                            {/* Image Skeleton */}
                            <div className="aspect-[3/4] bg-gray-200 animate-pulse" />

                            {/* Content Skeleton */}
                            <div className="p-4 space-y-4">
                                {/* Title Skeleton */}
                                <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
                                
                                {/* Rating Skeleton */}
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                                </div>

                                {/* Price and Stats Skeleton */}
                                <div className="flex justify-between items-center">
                                    <div className="space-y-2">
                                        <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
                                        <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                                        <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More Button Skeleton */}
                <div className="flex justify-center mt-8">
                    <div className="h-10 w-32 bg-gray-200 rounded-full animate-pulse" />
                </div>
            </div>
        </div>
    )
}

export default MainContentSkeleton