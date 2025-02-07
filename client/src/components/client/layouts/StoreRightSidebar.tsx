import React from 'react'
import { Card, Divider, Tag, Button, Progress, List, Avatar } from 'antd'
import { motion } from 'framer-motion'
import {
    FireOutlined,
    RiseOutlined,
    StarOutlined,
    EyeOutlined,
    ShoppingCartOutlined,
    ClockCircleOutlined,
} from '@ant-design/icons'

const StoreRightSidebar = () => {
    const topBooks = [
        {
            title: 'Atomic Habits',
            author: 'James Clear',
            image: '/img/atomic-habits.webp',
            rating: 4.8,
            sales: 1234,
        },
        {
            title: 'The Psychology of Money',
            author: 'Morgan Housel',
            image: '/img/psychology-money.webp',
            rating: 4.7,
            sales: 982,
        },
        {
            title: 'Deep Work',
            author: 'Cal Newport',
            image: '/img/deep-work.webp',
            rating: 4.6,
            sales: 856,
        },
    ]

    const recentlyViewed = [
        {
            title: 'Think and Grow Rich',
            price: 19.99,
            image: '/img/think-grow-rich.webp',
            timeAgo: '2 hours ago',
        },
        {
            title: 'Rich Dad Poor Dad',
            price: 24.99,
            image: '/img/rich-dad.webp',
            timeAgo: '3 hours ago',
        },
    ]

    const categoryStats = [
        { name: 'Self Development', percentage: 85 },
        { name: 'Business', percentage: 70 },
        { name: 'Psychology', percentage: 65 },
        { name: 'Fiction', percentage: 55 },
    ]

    return (
        <motion.div
            className="w-96 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Trending Books */}
            <Card
                title={
                    <span className="flex items-center gap-2">
                        <FireOutlined className="text-orange-500" />
                        Trending Books
                    </span>
                }
                className="shadow-sm"
            >
                <List
                    itemLayout="horizontal"
                    dataSource={topBooks}
                    renderItem={(book, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <List.Item className="cursor-pointer hover:bg-gray-50 rounded-lg p-2">
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            shape="square"
                                            size={64}
                                            src={book.image}
                                            className="rounded-lg"
                                        />
                                    }
                                    title={book.title}
                                    description={
                                        <div className="space-y-1">
                                            <div className="text-gray-500">
                                                {book.author}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <StarOutlined className="text-yellow-400" />
                                                <span>{book.rating}</span>
                                                <Divider type="vertical" />
                                                <ShoppingCartOutlined className="text-green-500" />
                                                <span>{book.sales}</span>
                                            </div>
                                        </div>
                                    }
                                />
                            </List.Item>
                        </motion.div>
                    )}
                />
            </Card>

            {/* Category Stats */}
            <Card
                title={
                    <span className="flex items-center gap-2">
                        <RiseOutlined className="text-blue-500" />
                        Popular Categories
                    </span>
                }
                className="shadow-sm"
            >
                <div className="space-y-4">
                    {categoryStats.map((category, index) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="flex justify-between mb-1">
                                <span className="text-gray-600">
                                    {category.name}
                                </span>
                                <span className="text-gray-400">
                                    {category.percentage}%
                                </span>
                            </div>
                            <Progress
                                percent={category.percentage}
                                showInfo={false}
                                strokeColor={{
                                    '0%': '#1890ff',
                                    '100%': '#06b6d4',
                                }}
                            />
                        </motion.div>
                    ))}
                </div>
            </Card>

            {/* Recently Viewed */}
            <Card
                title={
                    <span className="flex items-center gap-2">
                        <ClockCircleOutlined className="text-purple-500" />
                        Recently Viewed
                    </span>
                }
                className="shadow-sm"
            >
                <List
                    itemLayout="horizontal"
                    dataSource={recentlyViewed}
                    renderItem={(item, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <List.Item className="cursor-pointer hover:bg-gray-50 rounded-lg p-2">
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            shape="square"
                                            size={48}
                                            src={item.image}
                                            className="rounded-lg"
                                        />
                                    }
                                    title={item.title}
                                    description={
                                        <div className="flex items-center justify-between">
                                            <span className="text-blue-600 font-medium">
                                                ${item.price}
                                            </span>
                                            <span className="text-gray-400 text-sm">
                                                {item.timeAgo}
                                            </span>
                                        </div>
                                    }
                                />
                            </List.Item>
                        </motion.div>
                    )}
                />
                <div className="mt-4">
                    <Button type="link" block icon={<EyeOutlined />}>
                        View All History
                    </Button>
                </div>
            </Card>
        </motion.div>
    )
}

export default StoreRightSidebar
