import React, { useState, useEffect } from 'react'
import { Button, Input, Result, Skeleton, Spin, Tag } from 'antd'
import { motion, AnimatePresence } from 'framer-motion'
import { useGetCategoriesQuery } from '@/services/CategoryApi'
import { SearchOutlined, BookOutlined, FireOutlined } from '@ant-design/icons'

const { Search } = Input

export default function Content() {
    const { data: categories, isLoading, error } = useGetCategoriesQuery()
    const [activeCategory, setActiveCategory] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState('')

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    }

    if (isLoading)
        return (
            <Skeleton active />
        )

    if (error)
        return (
            <Result
                status="500"
                title="Error loading categories"
                subTitle="Please check your connection and try again."
            ></Result>
        )

    if (!categories) return <Result status="404" title="No categories found" />

    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <motion.div
            className="min-h-screen bg-gradient-to-br from-gray-50 to-white"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Search and Filter Section */}
            <div className="container mx-auto px-4 py-8">
                <motion.div
                    className="bg-white rounded-2xl shadow-sm p-6 mb-8"
                    variants={itemVariants}
                >
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="w-full md:w-1/2">
                            <Search
                                placeholder="Search categories..."
                                size="large"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                prefix={
                                    <SearchOutlined className="text-gray-400" />
                                }
                                className="w-full"
                            />
                        </div>
                        <div className="flex gap-4">
                            <Button
                                type={!activeCategory ? 'primary' : 'default'}
                                onClick={() => setActiveCategory(null)}
                                icon={<BookOutlined />}
                            >
                                All Categories
                            </Button>
                            <Button type="default" icon={<FireOutlined />}>
                                Popular
                            </Button>
                        </div>
                    </div>
                </motion.div>

                {/* Categories Grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    variants={containerVariants}
                >
                    <AnimatePresence>
                        {filteredCategories.map((category, index) => (
                            <motion.div
                                key={category._id}
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                                className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 
                                    overflow-hidden ${
                                        activeCategory === category._id
                                            ? 'ring-2 ring-blue-500'
                                            : ''
                                    }`}
                                onClick={() =>
                                    setActiveCategory(category._id || null)
                                }
                            >
                                <div className="relative h-40 bg-gradient-to-br from-blue-50 to-purple-50">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <BookOutlined className="text-4xl text-blue-500 opacity-50" />
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                        {category.name}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <Tag color="blue">200+ Books</Tag>
                                        <Tag color="green">Active</Tag>
                                    </div>
                                    <p className="mt-4 text-gray-600 text-sm line-clamp-2">
                                        Explore our collection of{' '}
                                        {category.name.toLowerCase()} books and
                                        discover new authors.
                                    </p>
                                    <Button
                                        type="link"
                                        className="mt-4 p-0 flex items-center gap-2"
                                    >
                                        Explore Category
                                        <motion.span
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 1.5,
                                            }}
                                        >
                                            →
                                        </motion.span>
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filteredCategories.length === 0 && (
                    <motion.div
                        className="text-center py-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <BookOutlined className="text-4xl text-gray-400 mb-4" />
                        <h3 className="text-xl text-gray-600">
                            No categories found
                        </h3>
                        <p className="text-gray-500">
                            Try adjusting your search terms
                        </p>
                    </motion.div>
                )}
            </div>
        </motion.div>
    )
}
