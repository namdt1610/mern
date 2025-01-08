import React, { useState } from 'react'
import { Input, Button, AutoComplete, Divider } from 'antd'
import { motion, AnimatePresence } from 'framer-motion'
import {
    SearchOutlined,
    RightOutlined,
    FireOutlined,
    HistoryOutlined,
    BookOutlined,
} from '@ant-design/icons'
import { debounce } from 'lodash'

const { Search } = Input

const featuredBooks = [
    {
        id: 1,
        title: 'Atomic Habits',
        author: 'James Clear',
        image: 'public/img/atomic-habits.webp',
        color: 'from-blue-500/20',
        description: 'Tiny Changes, Remarkable Results',
    },
    {
        id: 2,
        title: 'Dopamine Nation',
        author: 'Dr. Anna Lembke',
        image: 'public/img/dopamine.webp',
        color: 'from-purple-500/20',
        description: 'Finding Balance in the Age of Indulgence',
    },
    {
        id: 3,
        title: 'Beethoven',
        author: 'John Suchet',
        image: 'public/img/beethoven.webp',
        color: 'from-emerald-500/20',
        description: 'The Man Revealed',
    },
]

const trendingSearches = [
    'Atomic Habits',
    'Psychology Books',
    'Rich Dad Poor Dad',
    'Think and Grow Rich',
]

const recentSearches = [
    'Self Development',
    'Business Strategy',
    'Leadership',
    'Marketing',
]

const popularCategories = ['Fiction', 'Business', 'Self-Help', 'Science']

type SuggestionType = {
    value: string
    label: React.ReactNode
    disabled?: boolean
}

export default function Hero() {
    const [activeBook, setActiveBook] = useState(0)
    const [isHovering, setIsHovering] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [suggestions, setSuggestions] = useState<SuggestionType[]>([])
    const [showPlaceholder, setShowPlaceholder] = useState(true)

    // Generate initial placeholder suggestions
    const getPlaceholderSuggestions = () => [
        {
            label: (
                <div className="py-2 px-3 text-xs text-gray-500 bg-gray-50 flex items-center gap-2">
                    <FireOutlined /> TRENDING SEARCHES
                </div>
            ),
            options: trendingSearches.map((item) => ({
                value: item,
                label: (
                    <div className="py-2 px-3 hover:bg-blue-50 cursor-pointer flex items-center gap-2">
                        <FireOutlined className="text-orange-500" />
                        <span>{item}</span>
                    </div>
                ),
            })),
        },
        {
            label: (
                <div className="py-2 px-3 text-xs text-gray-500 bg-gray-50 flex items-center gap-2">
                    <HistoryOutlined /> RECENT SEARCHES
                </div>
            ),
            options: recentSearches.map((item) => ({
                value: item,
                label: (
                    <div className="py-2 px-3 hover:bg-blue-50 cursor-pointer flex items-center gap-2">
                        <HistoryOutlined className="text-gray-400" />
                        <span>{item}</span>
                        <button
                            className="ml-auto text-gray-400 hover:text-gray-600"
                            onClick={(e) => {
                                e.stopPropagation()
                                // Handle remove from recent searches
                            }}
                        >
                            ×
                        </button>
                    </div>
                ),
            })),
        },
        {
            label: (
                <div className="py-2 px-3 text-xs text-gray-500 bg-gray-50 flex items-center gap-2">
                    <BookOutlined /> POPULAR CATEGORIES
                </div>
            ),
            options: popularCategories.map((item) => ({
                value: item,
                label: (
                    <div className="py-2 px-3 hover:bg-blue-50 cursor-pointer flex items-center gap-2">
                        <BookOutlined className="text-blue-500" />
                        <span>{item}</span>
                    </div>
                ),
            })),
        },
    ]

    // Debounced search handler
    const handleSearch = debounce((value: string) => {
        if (!value) {
            setShowPlaceholder(true)
            return
        }
        setShowPlaceholder(false)
        // Your existing search logic here
    }, 300)

    const searchSection = (
        <motion.div
            className="flex gap-4 items-center relative w-full max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
        >
            <AutoComplete
                value={searchValue}
                options={
                    showPlaceholder
                        ? getPlaceholderSuggestions().flatMap((group) => [
                              {
                                  value: String(group.label),
                                  label: group.label,
                                  disabled: true,
                              },
                              ...group.options,
                          ])
                        : suggestions
                }
                onChange={(value) => {
                    setSearchValue(value)
                    handleSearch(value)
                }}
                onSelect={(value) => {
                    setSearchValue(value)
                    setShowPlaceholder(false)
                    // Handle search selection
                }}
                onFocus={() => setShowPlaceholder(true)}
                className="w-full"
                dropdownClassName="search-suggestions-dropdown"
                dropdownMatchSelectWidth={500}
            >
                <Input
                    size="large"
                    placeholder="Search for books, authors, or categories..."
                    prefix={<SearchOutlined className="text-gray-400" />}
                    className="rounded-full search-input"
                />
            </AutoComplete>
        </motion.div>
    )

    // Add these styles to your CSS
    const styles = `
        .search-suggestions-dropdown {
            max-height: 400px;
            overflow-y: auto;
        }

        .search-suggestions-dropdown .ant-select-item {
            padding: 0 !important;
        }
        
        .search-suggestions-dropdown .ant-select-item-option-disabled {
            cursor: default !important;
        }
        
        .search-suggestions-dropdown .ant-select-item-option-disabled:hover {
            background-color: transparent !important;
        }

        .search-input:focus {
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
        }

        .ant-select-dropdown {
            padding: 0;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
    `

    return (
        <>
            <style>{styles}</style>
            <div className="relative min-h-[600px] bg-gradient-to-br from-gray-50 to-white overflow-hidden">
                {/* Background Decorative Elements */}
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

                            {searchSection}

                            {/* Quick Categories */}
                            <motion.div
                                className="flex gap-4 flex-wrap"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                {[
                                    'Fiction',
                                    'Business',
                                    'Self-Help',
                                    'Science',
                                ].map((category, index) => (
                                    <motion.button
                                        key={category}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-4 py-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all
                                            text-gray-600 hover:text-gray-900 border border-gray-200"
                                    >
                                        {category}
                                    </motion.button>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Right Column - Featured Books Carousel */}
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
                                        className={`h-full rounded-2xl bg-gradient-to-br ${featuredBooks[activeBook].color} to-transparent
                                        p-8 flex items-center justify-between`}
                                    >
                                        <div className="space-y-4">
                                            <motion.h3
                                                className="text-2xl font-bold text-gray-900"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                {
                                                    featuredBooks[activeBook]
                                                        .title
                                                }
                                            </motion.h3>
                                            <motion.p
                                                className="text-gray-600"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                {
                                                    featuredBooks[activeBook]
                                                        .description
                                                }
                                            </motion.p>
                                            <motion.p
                                                className="text-sm text-gray-500"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                By{' '}
                                                {
                                                    featuredBooks[activeBook]
                                                        .author
                                                }
                                            </motion.p>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-6 py-2 bg-white rounded-full shadow-md hover:shadow-lg
                                                    transition-all text-gray-900 flex items-center gap-2"
                                            >
                                                Learn More <RightOutlined />
                                            </motion.button>
                                        </div>
                                        <motion.img
                                            src={
                                                featuredBooks[activeBook].image
                                            }
                                            alt={
                                                featuredBooks[activeBook].title
                                            }
                                            className="h-[300px] rounded-lg shadow-2xl"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            whileHover={{
                                                scale: 1.05,
                                                rotate: [-1, 1],
                                                transition: {
                                                    rotate: {
                                                        repeat: Infinity,
                                                        duration: 2,
                                                    },
                                                },
                                            }}
                                        />
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation Dots */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                {featuredBooks.map((_, index) => (
                                    <motion.button
                                        key={index}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 
                                            ${
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
                    </div>
                </div>
            </div>
        </>
    )
}
