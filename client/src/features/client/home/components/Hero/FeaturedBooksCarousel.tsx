import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RightOutlined } from '@ant-design/icons'

const featuredBooks = [
    {
        id: 1,
        title: 'Thuật Thao Túng',
        author: 'James Clear',
        image: '/img/thuat-thao-tung.webp',
        color: 'from-blue-500/20',
        description: 'Tiny Changes, Remarkable Results',
    },
    {
        id: 2,
        title: 'Dopamine Nation',
        author: 'Dr. Anna Lembke',
        image: '/img/dopamine.webp',
        color: 'from-purple-500/20',
        description: 'Finding Balance in the Age of Indulgence',
    },
    {
        id: 3,
        title: 'Beethoven',
        author: 'John Suchet',
        image: '/img/beethoven.webp',
        color: 'from-emerald-500/20',
        description: 'The Man Revealed',
    },
]

const FeaturedBooksCarousel = () => {
    const [activeBook, setActiveBook] = useState(0)

    return (
        <div className="relative h-[400px]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeBook}
                    className="absolute inset-0"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                >
                    <div
                        className={`h-full rounded-2xl bg-gradient-to-br ${featuredBooks[activeBook].color} to-transparent p-8 flex items-center justify-between`}
                    >
                        <div className="space-y-4">
                            <motion.h3 className="text-2xl font-bold text-gray-900">
                                {featuredBooks[activeBook].title}
                            </motion.h3>
                            <motion.p className="text-gray-600">
                                {featuredBooks[activeBook].description}
                            </motion.p>
                            <motion.p className="text-sm text-gray-500">
                                By {featuredBooks[activeBook].author}
                            </motion.p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all text-gray-900 flex items-center gap-2"
                            >
                                Learn More <RightOutlined />
                            </motion.button>
                        </div>
                        <motion.img
                            src={featuredBooks[activeBook].image}
                            alt={featuredBooks[activeBook].title}
                            className="h-[300px] rounded-lg shadow-2xl"
                        />
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {featuredBooks.map((_, index) => (
                    <motion.button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === activeBook
                                ? 'w-6 bg-gray-800'
                                : 'bg-gray-400'
                        }`}
                        onClick={() => setActiveBook(index)}
                        whileHover={{ scale: 1.2 }}
                    />
                ))}
            </div>
        </div>
    )
}

export default FeaturedBooksCarousel
