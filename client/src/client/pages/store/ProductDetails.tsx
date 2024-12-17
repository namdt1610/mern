import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductByIdQuery } from '@/services/ProductApi'
import { useAddToCartMutation } from '@/services/CartApi'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/Store'
import { useGetUserIdFromCookie } from '@/utils/useGetToken'

import {
    Button,
    Card,
    Empty,
    Input,
    InputNumber,
    List,
    Spin,
    Typography,
} from 'antd'
import MainLayout from '@/components/client/layout/MainLayout'
import toast from 'react-hot-toast'

const { Title, Text } = Typography
const { TextArea } = Input

const BookDetail: React.FC = () => {
    const userId = useGetUserIdFromCookie()
    console.log('User ID:', userId)

    const id: string = useParams<{ id: string }>().id ?? ''
    console.log('Product ID:', id)

    const { data: book, isLoading, refetch } = useGetProductByIdQuery(id)
    const [addToCart] = useAddToCartMutation()
    const nav = useNavigate()

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
    }, [book])

    const fetchComments = async (bookId: string) => {
        // Replace with real API call to fetch comments
        // Example:
        // const response = await fetch(`/api/books/${bookId}/comments`);
        // const data = await response.json();
        //   const data = [] // Replace with real response data
        //   setComments(data)
    }

    const handleAddToCart = async () => {
        // setInCart(true)
        if (!userId) {
            toast.error('Please log in to add to cart')
            throw new Error('User not logged in')
        }
        if (!id) {
            console.error('Book not found')
            throw new Error('Book not found')
        }
        console.log(id)

        try {
            await addToCart({
                userId,
                item: { product_id: id, quantity: 1 },
            }).unwrap()
        } catch (error) {
            toast.error('Failed to add to cart')
        }
    }

    const handleAddToFavorites = () => {
        setInFavorites(true)
        // Handle logic to add to favorites (e.g., call API to add product to user's favorites)
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
                    <Card
                        cover={
                            <img
                                alt={book.name}
                                src={`localhost:8888${book.imageUrl}`}
                            />
                        }
                        style={{ width: 300, margin: '0 auto' }}
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
                        {!book.stock ? (
                            <>
                                <Text type="success">In Stock</Text>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
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

                                    <Button onClick={handleIncrease}>+</Button>
                                </div>
                            </>
                        ) : (
                            <Text type="danger">Out of Stock</Text>
                        )}
                        <Button
                            type="primary"
                            style={{ marginTop: '16px' }}
                            onClick={handleAddToCart}
                            // disabled={book.stock}
                        >
                            {inCart ? 'Added to Cart' : 'Add to Cart'}
                        </Button>
                        <Button
                            type="default"
                            style={{ marginTop: '8px', marginLeft: '8px' }}
                            onClick={handleAddToFavorites}
                            disabled={inFavorites}
                        >
                            {inFavorites ? 'Favorited' : 'Add to Favorites'}
                        </Button>
                        <Button
                            type="primary"
                            style={{ marginTop: '16px' }}
                            onClick={() => nav('/books')}
                        >
                            Back to Books
                        </Button>
                    </Card>
                )}

                <div style={{ marginTop: '24px' }}>
                    <Title level={4}>Comments</Title>
                    <List
                        itemLayout="horizontal"
                        dataSource={comments}
                        renderItem={(comment) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={comment.author}
                                    description={comment.content}
                                />
                            </List.Item>
                        )}
                    />
                    <Input.TextArea
                        rows={4}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                    />
                    <Button
                        type="primary"
                        style={{ marginTop: '8px' }}
                        onClick={handleNewComment}
                    >
                        Add Comment
                    </Button>
                </div>
            </div>
        </MainLayout>
    )
}

export default BookDetail
