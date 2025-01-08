import React, { useRef, useState } from 'react'
import { Empty, Menu, Skeleton, Collapse, Input, Tag } from 'antd'
import {
    AppstoreOutlined,
    BookOutlined,
    FireOutlined,
    StarOutlined,
    TagOutlined,
    FilterOutlined,
    SearchOutlined,
} from '@ant-design/icons'
import { useGetCategoriesQuery } from '@/services/CategoryApi'
import { motion, AnimatePresence } from 'framer-motion'

const { Panel } = Collapse
const { Search } = Input

interface SidebarProps {
    onCategoryChange: (category: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ onCategoryChange }) => {
    const { data: categories, isLoading } = useGetCategoriesQuery()
    const [selectedCategory, setSelectedCategory] = useState<string>()
    const [searchTerm, setSearchTerm] = useState('')
    const menuRef = useRef<HTMLUListElement>(null)

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value)
        onCategoryChange(value)
    }

    const handleRefresh = () => {
        setSelectedCategory('')
        onCategoryChange('')
    }

    const filteredCategories = categories?.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const priceRanges = [
        { label: 'Under $10', value: '0-10', count: 150 },
        { label: '$10 - $20', value: '10-20', count: 285 },
        { label: '$20 - $50', value: '20-50', count: 325 },
        { label: 'Over $50', value: '50+', count: 120 },
    ]

    const ratings = [5, 4, 3, 2, 1]

    return (
        <motion.div
            className="w-auto bg-white rounded-xl shadow-sm p-4 h-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
        >
            {isLoading ? (
                <Skeleton active paragraph={{ rows: 10 }} />
            ) : (
                <div className="space-y-6">
                    {/* Search Categories */}
                    <div className="space-y-2">
                        <h3 className="text-gray-600 font-medium flex items-center gap-2">
                            <SearchOutlined /> Search Categories
                        </h3>
                        <Search
                            placeholder="Search categories..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full"
                            allowClear
                        />
                    </div>

                    {/* Categories */}
                    <Collapse
                        defaultActiveKey={['categories']}
                        ghost
                        className="border-none"
                    >
                        <Panel
                            header={
                                <span className="flex items-center gap-2 font-medium">
                                    <AppstoreOutlined /> Categories
                                </span>
                            }
                            key="categories"
                        >
                            <AnimatePresence>
                                {filteredCategories &&
                                filteredCategories.length > 0 ? (
                                    <Menu
                                        mode="inline"
                                        selectedKeys={
                                            selectedCategory
                                                ? [selectedCategory]
                                                : []
                                        }
                                        className="border-none"
                                    >
                                        <Menu.Item
                                            key="all"
                                            icon={<BookOutlined />}
                                            onClick={handleRefresh}
                                            className="rounded-lg"
                                        >
                                            All Categories
                                        </Menu.Item>
                                        {filteredCategories.map((category) => (
                                            <Menu.Item
                                                key={category._id}
                                                icon={<TagOutlined />}
                                                onClick={() =>
                                                    category._id &&
                                                    handleCategoryChange(
                                                        category._id
                                                    )
                                                }
                                                className="rounded-lg"
                                            >
                                                <div className="flex justify-between items-center">
                                                    <span>{category.name}</span>
                                                    <Tag className="ml-2">
                                                        {Math.floor(
                                                            Math.random() * 100
                                                        )}
                                                    </Tag>
                                                </div>
                                            </Menu.Item>
                                        ))}
                                    </Menu>
                                ) : (
                                    <Empty
                                        description="No categories found"
                                        className="my-4"
                                    />
                                )}
                            </AnimatePresence>
                        </Panel>
                    </Collapse>

                    {/* Price Range */}
                    <Collapse ghost className="border-none">
                        <Panel
                            header={
                                <span className="flex items-center gap-2 font-medium">
                                    <FilterOutlined /> Price Range
                                </span>
                            }
                            key="price"
                        >
                            <Menu mode="inline" className="border-none">
                                {priceRanges.map((range) => (
                                    <Menu.Item
                                        key={range.value}
                                        className="rounded-lg"
                                    >
                                        <div className="flex justify-between items-center">
                                            <span>{range.label}</span>
                                            <Tag>{range.count}</Tag>
                                        </div>
                                    </Menu.Item>
                                ))}
                            </Menu>
                        </Panel>
                    </Collapse>

                    {/* Ratings */}
                    <Collapse ghost className="border-none">
                        <Panel
                            header={
                                <span className="flex items-center gap-2 font-medium">
                                    <StarOutlined /> Ratings
                                </span>
                            }
                            key="ratings"
                        >
                            <Menu mode="inline" className="border-none">
                                {ratings.map((rating) => (
                                    <Menu.Item
                                        key={rating}
                                        className="rounded-lg"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-1">
                                                {Array(rating)
                                                    .fill(null)
                                                    .map((_, i) => (
                                                        <StarOutlined
                                                            key={i}
                                                            className="text-yellow-400"
                                                        />
                                                    ))}
                                                {Array(5 - rating)
                                                    .fill(null)
                                                    .map((_, i) => (
                                                        <StarOutlined
                                                            key={i}
                                                            className="text-gray-300"
                                                        />
                                                    ))}
                                            </div>
                                            <Tag>
                                                {Math.floor(
                                                    Math.random() * 200
                                                )}
                                            </Tag>
                                        </div>
                                    </Menu.Item>
                                ))}
                            </Menu>
                        </Panel>
                    </Collapse>

                    {/* Popular Tags */}
                    <Collapse ghost className="border-none">
                        <Panel
                            header={
                                <span className="flex items-center gap-2 font-medium">
                                    <FireOutlined /> Popular Tags
                                </span>
                            }
                            key="tags"
                        >
                            <div className="flex flex-wrap gap-2">
                                {[
                                    'Fiction',
                                    'Business',
                                    'Self-Help',
                                    'Science',
                                    'History',
                                    'Biography',
                                ].map((tag) => (
                                    <Tag
                                        key={tag}
                                        className="cursor-pointer hover:bg-blue-50 transition-colors"
                                    >
                                        {tag}
                                    </Tag>
                                ))}
                            </div>
                        </Panel>
                    </Collapse>
                </div>
            )}
        </motion.div>
    )
}

export default Sidebar
