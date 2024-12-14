import React, { useState } from 'react'
import { useGetProductsQuery } from '@/services/ProductApi'
import { useGetCategoriesQuery } from '@/services/CategoryApi'
import {
    Input,
    Select,
    Card,
    Row,
    Col,
    Button,
    Skeleton,
    Pagination,
} from 'antd'
import { useNavigate } from 'react-router-dom'

const { Search } = Input
const { Option } = Select

interface ListAllProductProps {
    selectedCategory?: string
}

const ListAllProduct: React.FC<ListAllProductProps> = ({
    selectedCategory,
}) => {
    const { data: products, isLoading } = useGetProductsQuery()
    const { data: categories } = useGetCategoriesQuery()
    const [searchTerm, setSearchTerm] = useState('')
    const [category, setCategory] = useState('')
    const [sortOrder, setSortOrder] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 16
    const nav = useNavigate()

    const handleSearch = (value: string) => {
        setSearchTerm(value)
        setCurrentPage(1)
    }

    const handleCategoryChange = (value: string) => {
        //   console.log(value)
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
                ? product.category === (selectedCategory || category)
                : true
        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const sortedProducts = filteredProducts?.sort((a, b) => {
        if (sortOrder === 'priceAsc') {
            return a.price - b.price
        } else if (sortOrder === 'priceDesc') {
            return b.price - a.price
        } else if (sortOrder === 'popularity') {
            return b.clickCount - a.clickCount
        }
        return 0
    })

    const paginatedProducts = sortedProducts?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <Search
                        placeholder="Search products"
                        onSearch={handleSearch}
                        enterButton
                    />
                </Col>
                <Col span={8}>
                    <Select
                        placeholder="Filter by category"
                        onChange={handleCategoryChange}
                        style={{ width: '100%' }}
                    >
                        <Option value="">All Categories</Option>
                        {categories?.map((c) => (
                            <Option key={c._id} value={c._id}>
                                {c.name}
                            </Option>
                        ))}
                    </Select>
                </Col>
                <Col span={8}>
                    <Select
                        placeholder="Sort by"
                        onChange={handleSortChange}
                        style={{ width: '100%' }}
                    >
                        <Option value="">Default</Option>
                        <Option value="priceAsc">Price: Low to High</Option>
                        <Option value="priceDesc">Price: High to Low</Option>
                        <Option value="popularity">Popularity</Option>
                    </Select>
                </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
                {isLoading
                    ? Array.from({ length: 8 }).map((_, index) => (
                          <Col span={6} key={index}>
                              <Card>
                                  <Skeleton.Image active />
                                  <Skeleton active paragraph={{ rows: 2 }} />
                              </Card>
                          </Col>
                      ))
                    : paginatedProducts?.map((product) => (
                          <Col span={6} key={product._id}>
                              <Card
                                  hoverable
                                  cover={
                                      <img
                                          alt={product.name}
                                          src={
                                              `localhost:8888${product.imageUrl}` ||
                                              `/client/public/img/beethoven.webp`
                                          }
                                      />
                                  }
                              >
                                  <Card.Meta
                                      title={product.name}
                                      description={`$${product.price}`}
                                  />
                                  <Button
                                      onClick={() => nav(`/${product._id}`)}
                                  >
                                      Details
                                  </Button>
                              </Card>
                          </Col>
                      ))}
            </Row>
            <Pagination
                current={currentPage}
                total={filteredProducts?.length}
                pageSize={itemsPerPage}
                onChange={(page) => setCurrentPage(page)}
            />
        </div>
    )
}

export default ListAllProduct
