// components/SearchSection.tsx
import React, { useState } from 'react'
import { Input, AutoComplete } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { debounce } from 'lodash'

const SearchSection = ({ onSearch }: { onSearch: (value: string) => void }) => {
    const [searchValue, setSearchValue] = useState('')

    const handleSearch = debounce((value: string) => {
        onSearch(value)
    }, 300)

    return (
        <div className="flex gap-4 items-center relative w-full max-w-2xl">
            <AutoComplete
                value={searchValue}
                onChange={(value) => {
                    setSearchValue(value)
                    handleSearch(value)
                }}
                onFocus={() => {}}
                className="w-full"
                popupMatchSelectWidth={500}
            >
                <Input
                    size="large"
                    placeholder="Search for books, authors, or categories..."
                    prefix={<SearchOutlined className="text-gray-400" />}
                    className="rounded-full"
                />
            </AutoComplete>
        </div>
    )
}

export default SearchSection
