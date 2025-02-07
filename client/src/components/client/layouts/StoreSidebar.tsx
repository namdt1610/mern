import React, { useRef, useState, useMemo } from 'react'
import { Empty, Menu, Skeleton, Collapse, Input, Tag } from 'antd'
import {
    AppstoreOutlined,
    FilterOutlined,
    SearchOutlined,
    StarOutlined,
    TagOutlined,
} from '@ant-design/icons'
import { useGetCategoriesQuery } from '@/services/CategoryApi'

const { Search } = Input

interface SidebarProps {
    onCategoryChange: (value: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ onCategoryChange }) => {
    const { data: categories, isLoading } = useGetCategoriesQuery()
    const [selectedCategory, setSelectedCategory] = useState<string>()
    const [searchTerm, setSearchTerm] = useState('')

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value)
        onCategoryChange(value)
    }

    const handleRefresh = () => {
        setSelectedCategory(undefined)
        onCategoryChange('')
    }

    // Tạo danh sách categories chỉ khi categories thay đổi
    const categoryItems = useMemo(() => {
        return (
            categories?.map((category) => ({
                key: category._id,
                icon: <TagOutlined />,
                label: (
                    <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <Tag className="ml-2">
                            {Math.floor(Math.random() * 100)}
                        </Tag>
                    </div>
                ),
                onClick: () => handleCategoryChange(category._id),
            })) || []
        )
    }, [categories])

    // Cấu trúc mới của collapseItems theo chuẩn Ant Design
    const collapseItems = useMemo(
        () => [
            {
                key: 'categories',
                label: (
                    <span className="flex items-center gap-2 font-medium">
                        <AppstoreOutlined /> Categories
                    </span>
                ),
                children: (
                    <Menu
                        mode="inline"
                        items={categoryItems}
                        onClick={({ key }) => handleCategoryChange(key)}
                    />
                ),
            },
            {
                key: 'price',
                label: (
                    <span className="flex items-center gap-2 font-medium">
                        <FilterOutlined /> Price Range
                    </span>
                ),
                children: <div>Price range filters here</div>,
            },
            {
                key: 'ratings',
                label: (
                    <span className="flex items-center gap-2 font-medium">
                        <StarOutlined /> Ratings
                    </span>
                ),
                children: <div>Rating filters here</div>,
            },
        ],
        [categoryItems]
    )

    return (
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

            {/* Categories & Filters */}
            <Collapse
                defaultActiveKey={['categories']}
                ghost
                className="border-none"
                items={collapseItems} // ✅ Fix lỗi children
            />
        </div>
    )
}

export default Sidebar
