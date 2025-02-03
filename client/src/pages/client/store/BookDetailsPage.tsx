import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductByIdQuery } from '@/services/ProductApi'
import { useAddToCartMutation } from '@/services/CartApi'
import { useGetUserIdFromCookie } from '@/utils/useGetToken'
import {
    useAddToFavoritesMutation,
    useGetFavoritesQuery,
} from '@/services/UserApi'
import { useGetInventoryByBookIdQuery } from '@/services/InventoryApi'

import {
    Button,
    Card,
    Empty,
    InputNumber,
    App,
    Spin,
    Typography,
    Image,
} from 'antd'
import MainLayout from '@/components/client/layout/MainLayout'
import ReviewSection from './components/ReviewSection'
import styles from './styles/BookDetailsPage.module.scss'

const { Title, Text } = Typography

const BookDetail: React.FC = () => {
    const { message } = App.useApp()
    const nav = useNavigate()

    const userId = useGetUserIdFromCookie()
    const id: string = useParams<{ id: string }>().id ?? ''

    const { data: book, isLoading, refetch } = useGetProductByIdQuery(id)
    const { data: stock } = useGetInventoryByBookIdQuery(id)
    const { data: favorites } = useGetFavoritesQuery(userId!)
    const [addToCart] = useAddToCartMutation()
    const [addToFav] = useAddToFavoritesMutation()

    const [inCart, setInCart] = useState(false)
    const [inFavorites, setInFavorites] = useState(false)
    const [quantity, setQuantity] = useState(1)

    const handleChange = (value: number | null) => {
        if (value) setQuantity(value)
    }

    const handleIncrease = () => setQuantity((prev) => prev + 1)
    const handleDecrease = () =>
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

    useEffect(() => {
        if (favorites) {
            const favIds = favorites.map((fav) => fav._id)
            setInFavorites(favIds.includes(id))
        }
    }, [favorites, id])

    const handleAddToCart = async () => {
        if (!userId) {
            message.error('Please log in to add to cart')
            throw new Error('User not logged in')
        }

        if (!id) {
            console.error('Book not found')
            throw new Error('Book not found')
        }

        try {
            await addToCart({
                userId,
                item: { product_id: id, quantity: 1 },
            }).unwrap()
            message.success('Added to cart')
            setInCart(true)
        } catch (error) {
            console.log(error)
            message.error('Failed to add to cart')
        }
    }

    const handleAddToFavorites = async () => {
        if (!userId) {
            message.error('Please log in to add to favorites')
            throw new Error('User not logged in')
        }
        try {
            await addToFav({ userId, productId: id }).unwrap()
            message.success('Added to favorites')
        } catch (error: any) {
            const errorMessage =
                error?.data?.message ||
                'An error occurred while adding to favorites'
            message.error(errorMessage)
        }
    }

    if (!book) {
        return (
            <MainLayout>
                <Empty description={'Không tìm thấy sách này'}>
                    <Button onClick={refetch}>Tải lại</Button>
                </Empty>
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            <div className={styles.container}>
                {isLoading ? (
                    <div className={styles.glassCard}>
                        <Spin />
                    </div>
                ) : (
                    <>
                        <div className={styles.imageContainer}>
                            <div className={styles.glassCard}>
                                <Image
                                    alt={book.name}
                                    src={`http://localhost:8888/uploads/${book.imageUrl}`}
                                    style={{
                                        objectFit: 'cover',
                                        height: '500px',
                                        borderRadius: '8px',
                                    }}
                                />
                            </div>
                        </div>
                        <div className={styles.infoContainer}>
                            <div className={styles.glassCard}>
                                <div className={styles.bookInfoContainer}>
                                    <div className={styles.bookInfo}>
                                        <Title level={3}>{book.name}</Title>
                                        <Text strong>Author: </Text>
                                        <Text>{book.author}</Text>
                                        <br />
                                        <Text strong>Price: </Text>
                                        <Text>${book.price}</Text>
                                        <br />
                                        <Text strong>Description: </Text>
                                        <Text>{book.description}</Text>
                                    </div>
                                    <div className={styles.blankDiv}></div>
                                    <div className={styles.stockInfo}>
                                        {stock ? (
                                            <>
                                                <Text type="success">
                                                    In Stock
                                                </Text>
                                                <br />
                                                <Text>
                                                    Quantity: {stock?.quantity}
                                                </Text>
                                                <div
                                                    className={
                                                        styles.quantityControls
                                                    }
                                                >
                                                    <Button
                                                        onClick={handleDecrease}
                                                        disabled={
                                                            quantity === 1
                                                        }
                                                    >
                                                        -
                                                    </Button>
                                                    <InputNumber
                                                        min={1}
                                                        max={stock?.quantity}
                                                        value={quantity}
                                                        onChange={handleChange}
                                                    />
                                                    <Button
                                                        onClick={handleIncrease}
                                                        disabled={
                                                            quantity >=
                                                            stock?.quantity
                                                        }
                                                    >
                                                        +
                                                    </Button>
                                                </div>
                                            </>
                                        ) : (
                                            <Text type="danger">
                                                This items is currently out of
                                                stock
                                            </Text>
                                        )}
                                        <Button
                                            type="primary"
                                            style={{
                                                marginTop: '16px',
                                                width: '100%',
                                            }}
                                            onClick={handleAddToCart}
                                            disabled={!stock}
                                        >
                                            {inCart
                                                ? 'Added to Cart'
                                                : 'Add to Cart'}
                                        </Button>
                                        <Button
                                            type="primary"
                                            style={{
                                                marginTop: '16px',
                                                width: '100%',
                                            }}
                                            onClick={handleAddToCart}
                                            disabled={!stock}
                                        >
                                            {inCart
                                                ? 'Added to Cart'
                                                : 'Buy Now'}
                                        </Button>
                                        <Button
                                            type="default"
                                            style={{
                                                marginTop: '8px',
                                                width: '100%',
                                            }}
                                            onClick={handleAddToFavorites}
                                            disabled={inFavorites}
                                        >
                                            {inFavorites
                                                ? 'Favorited'
                                                : 'Add to Favorites'}
                                        </Button>
                                        <Button
                                            type="primary"
                                            style={{
                                                marginTop: '16px',
                                                width: '100%',
                                            }}
                                            onClick={() => nav('/books')}
                                        >
                                            Back to Books
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.reviewContainer}>
                            <Card className={styles.glassCard}>
                                <ReviewSection productId={id} />
                            </Card>
                        </div>
                    </>
                )}
            </div>
        </MainLayout>
    )
}

export default BookDetail
