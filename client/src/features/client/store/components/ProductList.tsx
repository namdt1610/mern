import React, { useState } from 'react'
import { useGetActiveProductsQuery } from '@/services/ProductApi'
import { useGetCategoriesQuery } from '@/services/CategoryApi'
import {
    Button,
    Card,
    Input,
    Pagination,
    Select,
    Skeleton,
    Tag,
    Tooltip,
    Rate,
} from 'antd'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
    ShoppingCartOutlined,
    HeartOutlined,
    EyeOutlined,
    FilterOutlined,
    SortAscendingOutlined,
} from '@ant-design/icons'

const { Search } = Input
const { Option } = Select

export interface ProductListProps {
    selectedCategory?: string
}

const ProductList: React.FC<ProductListProps> = ({ selectedCategory }) => {
    const { data: products, isLoading } = useGetActiveProductsQuery()
    const { data: categories } = useGetCategoriesQuery()
    const [searchTerm, setSearchTerm] = useState('')
    const [category, setCategory] = useState('')
    const [sortOrder, setSortOrder] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 12
    const nav = useNavigate()

    const handleSearch = (value: string) => {
        setSearchTerm(value)
        setCurrentPage(1)
    }

    const handleCategoryChange = (value: string) => {
        setCategory(value)
        setCurrentPage(1)
    }

    const handleSortChange = (value: string) => {
        setSortOrder(value)
        setCurrentPage(1)
    }

    const filteredProducts = products?.filter((product) => {
        const matchesCategory =
            selectedCategory || category
                ? product.category.name === (selectedCategory || category)
                : true
        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const sortedProducts = filteredProducts?.sort((a, b) => {
        if (sortOrder === 'priceAsc') return a.price - b.price
        if (sortOrder === 'priceDesc') return b.price - a.price
        if (sortOrder === 'popularity') return b.clickCount - a.clickCount
        return 0
    })

    const paginatedProducts = sortedProducts?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    return (
        <div className="min-h-screen bg-gray-50 py-8 rounded-xl">
            <div className="container mx-auto px-4">
                {/* Filters Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-sm p-6 mb-8"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                                <FilterOutlined /> <span>Search</span>
                            </div>
                            <Search
                                placeholder="Search by title, author..."
                                allowClear
                                onSearch={handleSearch}
                                className="w-full"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                                <FilterOutlined /> <span>Category</span>
                            </div>
                            <Select
                                placeholder="Select category"
                                onChange={handleCategoryChange}
                                className="w-full"
                                allowClear
                            >
                                {categories?.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                                <SortAscendingOutlined /> <span>Sort by</span>
                            </div>
                            <Select
                                placeholder="Sort by"
                                onChange={handleSortChange}
                                className="w-full"
                                allowClear
                            >
                                <Option value="priceAsc">
                                    Price: Low to High
                                </Option>
                                <Option value="priceDesc">
                                    Price: High to Low
                                </Option>
                                <Option value="popularity">Popularity</Option>
                            </Select>
                        </div>
                    </div>
                </motion.div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <AnimatePresence>
                        {isLoading
                            ? Array.from({ length: 8 }).map((_, index) => (
                                  <motion.div
                                      key={`skeleton-${index}`}
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      exit={{ opacity: 0 }}
                                  >
                                      <Card className="h-full">
                                          <Skeleton.Image
                                              active
                                              className="w-full h-48"
                                          />
                                          <Skeleton
                                              active
                                              paragraph={{ rows: 2 }}
                                          />
                                      </Card>
                                  </motion.div>
                              ))
                            : paginatedProducts?.map((product) => (
                                  <motion.div
                                      key={product._id}
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      exit={{ opacity: 0 }}
                                      whileHover={{ y: -5 }}
                                      className="group"
                                  >
                                      <Card
                                          hoverable
                                          className="h-full overflow-hidden"
                                          cover={
                                              <div className="relative aspect-[3/4] overflow-hidden">
                                                  <img
                                                      alt={product.name}
                                                      src={
                                                          `http://localhost:8888/uploads/${product.imageUrl}` ||
                                                          '/img/bia1_thuong.webp'
                                                      }
                                                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                                                  />
                                                  <div
                                                      className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 
                                                      transition-opacity duration-300 flex items-center justify-center gap-3"
                                                  >
                                                      <Tooltip title="Quick View">
                                                          <Button
                                                              shape="circle"
                                                              icon={
                                                                  <EyeOutlined />
                                                              }
                                                              onClick={(e) => {
                                                                  e.stopPropagation()
                                                                  nav(
                                                                      `/${product._id}`
                                                                  )
                                                              }}
                                                          />
                                                      </Tooltip>
                                                      <Tooltip title="Add to Cart">
                                                          <Button
                                                              shape="circle"
                                                              icon={
                                                                  <ShoppingCartOutlined />
                                                              }
                                                          />
                                                      </Tooltip>
                                                      <Tooltip title="Add to Wishlist">
                                                          <Button
                                                              shape="circle"
                                                              icon={
                                                                  <HeartOutlined />
                                                              }
                                                          />
                                                      </Tooltip>
                                                  </div>
                                              </div>
                                          }
                                      >
                                          <div className="space-y-2">
                                              <h3 className="text-lg font-semibold line-clamp-2">
                                                  {product.name}
                                              </h3>
                                              <Rate
                                                  disabled
                                                  defaultValue={4}
                                                  className="text-sm"
                                              />
                                              <div className="flex justify-between items-center">
                                                  <span className="text-lg font-bold text-blue-600">
                                                      đ{product.price}
                                                  </span>
                                                  <Tag color="blue">
                                                      {product.clickCount} views
                                                  </Tag>
                                              </div>
                                          </div>
                                      </Card>
                                  </motion.div>
                              ))}
                    </AnimatePresence>
                </div>

                {/* Pagination */}
                {!isLoading && filteredProducts && (
                    <motion.div
                        className="flex justify-center mt-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <Pagination
                            current={currentPage}
                            total={filteredProducts.length}
                            pageSize={itemsPerPage}
                            onChange={setCurrentPage}
                            showSizeChanger={false}
                        />
                    </motion.div>
                )}
            </div>
        </div>
    )
}

export default ProductList
