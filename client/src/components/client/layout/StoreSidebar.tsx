import React, { useState, useRef } from 'react'
import { Menu, Skeleton, Empty, Button } from 'antd'
import { AppstoreOutlined } from '@ant-design/icons'
import { useGetCategoriesQuery } from '@/services/CategoryApi'

interface SidebarProps {
    onCategoryChange: (category: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ onCategoryChange }) => {
    const { data: categories, isLoading } = useGetCategoriesQuery()
    const [selectedCategory, setSelectedCategory] = useState<string>()
    const menuRef = useRef<HTMLUListElement>(null)

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value)
        onCategoryChange(value)
    }

    const handleRefresh = () => {
        setSelectedCategory('')
        onCategoryChange('')
    }

    if (!categories)
        return (
            <Empty
                description="Không có danh mục nào"
                className="flex justify-center items-center h-full"
            />
        )

    const menuItems = [
        {
            key: 'all',
            icon: <AppstoreOutlined />,
            label: 'All Categories',
            onClick: handleRefresh,
        },
        ...categories.map((category) => ({
            key: category._id || '',
            icon: <AppstoreOutlined />,
            label: category.name,
            onClick: () => category._id && handleCategoryChange(category._id),
        })),
    ]

    return (
        <div className="w-1/4">
            {isLoading ? (
                <Skeleton active paragraph={{ rows: 15 }} />
            ) : categories && categories.length > 0 ? (
                <Menu
                    ref={menuRef as any}
                    mode="inline"
                    style={{ height: '100%', borderRight: 0 }}
                    selectedKeys={
                        selectedCategory ? [selectedCategory] : undefined
                    }
                    items={menuItems}
                ></Menu>
            ) : (
                <Empty
                    description="Không có danh mục nào"
                    className="flex justify-center items-center h-full"
                />
            )}
        </div>
    )
}

export default Sidebar
