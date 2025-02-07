import React, { lazy, useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import { FireOutlined, HistoryOutlined, BookOutlined } from '@ant-design/icons'

const SearchSection = lazy(() => import('./SearchSection'))
const FeaturedBooksCarousel = lazy(() => import('./FeaturedBooksCarousel'))
const QuickCategories = lazy(() => import('./QuickCategories'))

const Hero = () => {
    const [showPlaceholder, setShowPlaceholder] = useState(true)

    return (
            <div className="relative min-h-[600px] overflow-hidden px-14">
                <motion.div
                    className="absolute inset-0 opacity-40"
                    initial={false}
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                        backgroundSize: ['100% 100%', '120% 120%'],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        repeatType: 'reverse',
                    }}
                    style={{
                        backgroundImage: 'url("/patterns/grid.svg")',
                    }}
                />

                <div className="container mx-auto px-4 py-[75px] relative">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-8"
                        >
                            <motion.h1
                                className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                Find Your Next
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                    Great Read
                                </span>
                            </motion.h1>

                            <motion.p
                                className="text-lg text-gray-600 max-w-md"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                Discover millions of eBooks, audiobooks, and
                                more at your fingertips.
                            </motion.p>

                            <Suspense fallback={<div>Loading Search...</div>}>
                                <SearchSection
                                    onSearch={(value) => console.log(value)}
                                />
                            </Suspense>

                            <Suspense
                                fallback={<div>Loading Categories...</div>}
                            >
                                <QuickCategories />
                            </Suspense>
                        </motion.div>

                        {/* Right Column - Featured Books Carousel */}
                        <Suspense
                            fallback={<div>Loading Featured Books...</div>}
                        >
                            <FeaturedBooksCarousel />
                        </Suspense>
                    </div>
                </div>
            </div>
    )
}

export default Hero
