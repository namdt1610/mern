import React from 'react'
import { motion } from 'framer-motion'

const SubContentSkeleton = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4 py-8">
                {/* Search and Filter Section Skeleton */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search Bar Skeleton */}
                        <div className="w-full md:w-1/2">
                            <div className="h-10 bg-gray-200 rounded-lg animate-pulse" />
                        </div>
                        {/* Filter Buttons Skeleton */}
                        <div className="flex gap-4">
                            <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse" />
                            <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* Categories Grid Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-sm overflow-hidden"
                        >
                            {/* Image Placeholder */}
                            <div className="h-40 bg-gray-200 animate-pulse" />
                            
                            {/* Content Placeholder */}
                            <div className="p-6 space-y-4">
                                {/* Title Skeleton */}
                                <div className="h-6 bg-gray-200 w-3/4 rounded animate-pulse" />
                                
                                {/* Tags Skeleton */}
                                <div className="flex gap-2">
                                    <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
                                </div>
                                
                                {/* Description Skeleton */}
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 w-full rounded animate-pulse" />
                                    <div className="h-4 bg-gray-200 w-2/3 rounded animate-pulse" />
                                </div>
                                
                                {/* Button Skeleton */}
                                <div className="h-6 bg-gray-200 w-32 rounded animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SubContentSkeleton