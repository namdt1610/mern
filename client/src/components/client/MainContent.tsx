import React, {useEffect, useState} from 'react'
import {Button} from 'antd'
import {useGetProductsQuery, useUpdateClickCountMutation,} from '@/services/ProductApi'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function MainContent() {
    const { data: products, isLoading, error } = useGetProductsQuery()
    const [updateClickCount] = useUpdateClickCountMutation()
    const [displayedProducts, setDisplayedProducts] = useState<any[]>([])
    const [hasMore, setHasMore] = useState(true)
    const itemsPerLoad = 8 // Number of items to load each time

    useEffect(() => {
        if (products) {
            setDisplayedProducts(products.slice(0, itemsPerLoad))
        }
    }, [products])

    useEffect(() => {
        if (products) {
            setDisplayedProducts(products.slice(0, itemsPerLoad))
        }
    }, [products])

    const handleProductClick = async (productId: string) => {
        try {
            await updateClickCount(productId).unwrap()
        } catch (error) {
            console.error('Failed to update click count:', error)
        }
    }

    const fetchMoreData = () => {
        if (displayedProducts.length >= (products?.length || 0)) {
            setHasMore(false)
            return
        }

        setTimeout(() => {
            setDisplayedProducts(
                products?.slice(0, displayedProducts.length + itemsPerLoad) ||
                    []
            )
        }, 500)
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading products</div>

    return (
        <div>
            <div className="p-10 bg-white">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    Featured Products
                </h2>
                <InfiniteScroll
                    dataLength={displayedProducts.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<h4>Loading more...</h4>}
                >
                    <div className="grid grid-cols-4 gap-6">
                        {displayedProducts.map((product) => (
                            <div
                                key={product._id}
                                onClick={() => handleProductClick(product._id)}
                                className="p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                            >
                                <img
                                    className="rounded-lg w-full h-48 object-cover mb-4"
                                    src={product.imageUrl}
                                    alt={product.name}
                                />
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {product.name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    ${product.price}
                                </p>
                                <span className="text-sm text-gray-600">
                                    Clicks: {product.clickCount}
                                </span>
                                <span className="text-sm text-gray-600">
                                    Sold: {product.sold}
                                </span>

                                <Button className="mt-4 w-full" type="primary">
                                    Details
                                </Button>
                            </div>
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    )
}
