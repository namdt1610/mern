import { Button } from 'antd/'
import React from 'react'
import { useGetCategoriesQuery } from '@/services/CategoryApi'

export default function Content() {
    const { data: categories, isLoading, error } = useGetCategoriesQuery()
    if (!categories) return null
    return (
        <div>
            {/* Content Section */}
            <div className="p-10 bg-gray-50">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    Explore Categories
                </h2>
                <div className="grid grid-cols-3 gap-6">
                    {/* Danh mục */}
                    {categories.map((category, index) => (
                        <Button
                            onClick={() => console.log('Clicked')}
                            type="primary"
                            key={index}
                            className="p-6 rounded-lg shadow-md text-center hover:scale-105 transition-transform duration-300"
                        >
                            <p className="text-xl font-bold">{category.name}</p>
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}
