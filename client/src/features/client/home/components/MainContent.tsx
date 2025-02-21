import React, { useEffect, useState } from 'react'
import { Button, Result, Skeleton, Spin, Tag, Tooltip } from 'antd'
import { motion, AnimatePresence } from 'framer-motion'
import {
    useGetProductsQuery,
    useUpdateClickCountMutation,
} from '@/services/ProductApi'
import {
    EyeOutlined,
    ShoppingCartOutlined,
    HeartOutlined,
    StarOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

export default function MainContent() {
    const nav = useNavigate()
    const { data: products, isLoading, error } = useGetProductsQuery()
    const [updateClickCount] = useUpdateClickCountMutation()
    const [displayedProducts, setDisplayedProducts] = useState<any[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedFilter, setSelectedFilter] = useState('all')
    const itemsPerPage = 8

    useEffect(() => {
        if (products) {
            setDisplayedProducts(products.slice(0, itemsPerPage))
        }
    }, [products])

    const handleProductClick = async (productId: string) => {
        try {
            await updateClickCount(productId).unwrap()
            console.log('Click count updated')
        } catch (error) {
            console.error('Failed to update click count:', error)
        }
    }

    const loadMore = () => {
        const nextPage = currentPage + 1
        const newProducts = products?.slice(0, nextPage * itemsPerPage) || []
        setDisplayedProducts(newProducts)
        setCurrentPage(nextPage)
    }

    const hasMore = products
        ? displayedProducts.length < products.length
        : false

    const filters = [
        { key: 'all', label: 'All Books' },
        { key: 'popular', label: 'Popular' },
        { key: 'new', label: 'New Arrivals' },
        { key: 'trending', label: 'Trending' },
    ]

    if (isLoading) return <Skeleton active />

    if (error)
        return (
            <Result
                status="500"
                title="Error loading products"
                subTitle="Please check your connection and try again."
            ></Result>
        )

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                {/* Filters */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mb-8"
                >
                    <div className="flex flex-wrap gap-4 mb-6">
                        {filters.map((filter) => (
                            <Button
                                key={filter.key}
                                type={
                                    selectedFilter === filter.key
                                        ? 'primary'
                                        : 'default'
                                }
                                onClick={() => setSelectedFilter(filter.key)}
                                className="rounded-full"
                            >
                                {filter.label}
                            </Button>
                        ))}
                    </div>
                </motion.div>

                {/* Products Grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    layout
                >
                    <AnimatePresence>
                        {displayedProducts.map((product) => (
                            <motion.div
                                key={product._id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                whileHover={{ y: -5 }}
                                className="rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                                onClick={() => handleProductClick(product._id)}
                            >
                                {/* Image Container */}
                                <div className="relative aspect-[3/4] overflow-hidden rounded-t-xl">
                                    <img
                                        src={
                                            `http://localhost:8888/uploads/${product.imageUrl}` ||
                                            'public/img/bia1_thuong.webp'
                                        }
                                        alt={product.name}
                                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                                    />
                                    {/* Overlay with Quick Actions */}
                                    <div
                                        className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 
                                        transition-opacity duration-300 flex items-center justify-center gap-3"
                                    >
                                        <Tooltip title="Quick View">
                                            <Button
                                                shape="circle"
                                                icon={<EyeOutlined />}
                                                className="hover:scale-110 transition-transform"
                                                onClick={() => {
                                                    nav('/' + product._id)
                                                    handleProductClick(
                                                        product._id
                                                    )
                                                }}
                                            />
                                        </Tooltip>
                                        <Tooltip title="Add to Cart">
                                            <Button
                                                shape="circle"
                                                icon={<ShoppingCartOutlined />}
                                                className="hover:scale-110 transition-transform"
                                            />
                                        </Tooltip>
                                        <Tooltip title="Add to Wishlist">
                                            <Button
                                                shape="circle"
                                                icon={<HeartOutlined />}
                                                className="hover:scale-110 transition-transform"
                                            />
                                        </Tooltip>
                                    </div>
                                    {/* New Tag if product is new */}
                                    {product.isNew && (
                                        <Tag
                                            color="blue"
                                            className="absolute top-3 left-3"
                                        >
                                            New
                                        </Tag>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">
                                        {product.name}
                                    </h3>
                                    <div className="flex items-center gap-2 mb-3">
                                        <StarOutlined className="text-yellow-400" />
                                        <span className="text-sm text-gray-600">
                                            4.5 (120 reviews)
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-xl font-bold text-blue-600">
                                                ${product.price}
                                            </p>
                                            {product.oldPrice && (
                                                <p className="text-sm text-gray-400 line-through">
                                                    ${product.oldPrice}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Tooltip title="Views">
                                                <span className="flex items-center gap-1">
                                                    <EyeOutlined />{' '}
                                                    {product.clickCount}
                                                </span>
                                            </Tooltip>
                                            <Tooltip title="Sold">
                                                <span className="flex items-center gap-1">
                                                    <ShoppingCartOutlined />{' '}
                                                    {product.sold}
                                                </span>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Load More Button */}
                {hasMore && (
                    <motion.div
                        className="flex justify-center mt-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <Button
                            type="primary"
                            size="large"
                            onClick={loadMore}
                            className="px-8 rounded-full"
                        >
                            Xem thêm
                        </Button>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
