import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductByIdQuery } from '@/services/ProductApi'
import { useAddToCartMutation } from '@/services/CartApi'
import { useGetUserIdFromCookie } from '@/utils/useGetToken'
import {
    useAddToFavoritesMutation,
    useGetFavoritesQuery,
} from '@/services/UserApi'

import {
    Button,
    Card,
    Empty,
    Input,
    InputNumber,
    App,
    Spin,
    Typography,
    Row,
    Col,
    Divider,
} from 'antd'
import MainLayout from '@/components/client/layout/MainLayout'
import ReviewSection from './components/ReviewSection'

const { Title, Text } = Typography

const BookDetail: React.FC = () => {
    const { message } = App.useApp()
    const userId = useGetUserIdFromCookie()
    // console.log('User ID:', userId)

    const id: string = useParams<{ id: string }>().id ?? ''
    // console.log('Product ID:', id)

    const { data: book, isLoading, refetch } = useGetProductByIdQuery(id)
    const [addToCart] = useAddToCartMutation()
    const nav = useNavigate()
    const [addToFav] = useAddToFavoritesMutation()
    const { data: favorites } = useGetFavoritesQuery(userId!)
    const [inCart, setInCart] = useState(false)
    const [inFavorites, setInFavorites] = useState(false)
    const [comments, setComments] = useState<
        Array<{ author: string; content: string }>
    >([])
    const [newComment, setNewComment] = useState('')

    const [quantity, setQuantity] = useState(1)

    const handleChange = (value: number | null) => {
        if (value) setQuantity(value)
    }

    const handleIncrease = () => setQuantity((prev) => prev + 1)
    const handleDecrease = () =>
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

    useEffect(() => {
        if (book) {
            fetchComments(book._id)
        }
        if (favorites) {
            const favIds = favorites.map((fav) => fav._id)
            setInFavorites(favIds.includes(id))
        }
    }, [book, favorites, id])

    const fetchComments = async (bookId: string) => {
        // Replace with real API call to fetch comments
        // Example:
        // const response = await fetch(`/api/books/${bookId}/comments`);
        // const data = await response.json();
        //   const data = [] // Replace with real response data
        //   setComments(data)
    }

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

    const handleNewComment = async () => {
        // Call API to add new comment
        const newCommentData = { author: 'User', content: newComment }
        setComments((prevComments) => [...prevComments, newCommentData])
        setNewComment('') // Clear input after submission
    }

    if (!book) {
        return (
            <Empty description={'Không tìm thấy sách này'}>
                <Button onClick={refetch}>Tải lại</Button>
            </Empty>
        )
    }

    return (
        <MainLayout>
            <div style={{ padding: '24px' }}>
                {isLoading ? (
                    <Spin className="flex justify-center items-center h-full" />
                ) : (
                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Card
                                cover={
                                    <img
                                        alt={book.name}
                                        src={`http://localhost:8888/uploads/${book.imageUrl}`}
                                        style={{
                                            objectFit: 'cover',
                                            height: '800px',
                                            borderRadius: '8px',
                                        }}
                                    />
                                }
                                style={{
                                    marginBottom: '24px',
                                    borderRadius: '8px',
                                }}
                            >
                                <Card.Meta
                                    title={<Title level={3}>{book.name}</Title>}
                                    description={
                                        <>
                                            <Text strong>Author: </Text>
                                            <Text>{book.author}</Text>
                                            <br />
                                            <Text strong>Price: </Text>
                                            <Text>${book.price}</Text>
                                            <br />
                                            <Text strong>Description: </Text>
                                            <Text>{book.description}</Text>
                                        </>
                                    }
                                />
                                <Divider />

                                {!book.stock ? (
                                    <>
                                        <Text type="success">In Stock</Text>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 8,
                                                marginTop: '16px',
                                            }}
                                        >
                                            <Button
                                                onClick={handleDecrease}
                                                disabled={book.stock <= 1}
                                            >
                                                -
                                            </Button>
                                            <InputNumber
                                                min={1}
                                                value={quantity}
                                                onChange={handleChange}
                                                style={{ width: 70 }}
                                            />
                                            <Button onClick={handleIncrease}>
                                                +
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <Text type="danger">Out of Stock</Text>
                                )}
                                <Button
                                    type="primary"
                                    style={{ marginTop: '16px', width: '100%' }}
                                    onClick={handleAddToCart}
                                    disabled={!book.stock}
                                >
                                    {inCart ? 'Added to Cart' : 'Add to Cart'}
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
                                    style={{ marginTop: '16px', width: '100%' }}
                                    onClick={() => nav('/books')}
                                >
                                    Back to Books
                                </Button>
                            </Card>
                        </Col>
                        <Col xs={24} md={12}>
                            <div style={{ marginTop: '24px' }}>
                                <ReviewSection productId={id} />
                            </div>
                        </Col>
                    </Row>
                )}
            </div>
        </MainLayout>
    )
}

export default BookDetail
