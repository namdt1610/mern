import React, { useState } from 'react'
import { Button, Input, List, Rate, Avatar, Typography, Divider } from 'antd'
import {
    useGetReviewsByProductIdQuery,
    useAddReviewMutation,
} from '@/services/ReviewApi'
import { UserOutlined } from '@ant-design/icons'
import toast from 'react-hot-toast'

const { TextArea } = Input
const { Title, Text } = Typography

export interface ProductReviewProps {
    userId: string
    productId: string
}

const ProductReview: React.FC<ProductReviewProps> = ({ userId, productId }) => {
    const [rating, setRating] = useState<number>(5)
    const [comment, setComment] = useState<string>('')

    const {
        data: reviews,
        isLoading,
        refetch,
    } = useGetReviewsByProductIdQuery(productId!, { skip: !productId })
    const [addReview] = useAddReviewMutation()

    const handleSubmitReview = async () => {
        if (!userId) {
            toast.error('Please login to review')
            return
        }

        if (!comment.trim()) {
            toast.error('Please enter a comment')
            return
        }

        try {
            await addReview({
                _id: '',
                productId,
                userId,
                rating,
                comment,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }).unwrap()

            toast.success('Review added successfully')
            setComment('')
            setRating(5)
            refetch()
        } catch (error) {
            toast.error('Failed to add review')
        }
    }

    return (
        <div className="review-section">
            <Title level={4}>Reviews</Title>
            <Divider />

            {/* Review Form */}
            <div style={{ marginBottom: 24 }}>
                <div style={{ marginBottom: 16 }}>
                    <Text strong>Your Rating:</Text>
                    <Rate value={rating} onChange={setRating} />
                </div>
                <TextArea
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your review here..."
                    style={{ marginBottom: 16 }}
                />
                <Button type="primary" onClick={handleSubmitReview}>
                    Submit Review
                </Button>
            </div>

            {/* Review List */}
            <List
                loading={isLoading}
                itemLayout="horizontal"
                dataSource={reviews || []}
                renderItem={(review) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar icon={<UserOutlined />} />}
                            title={
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                    }}
                                >
                                    <Text strong>User</Text>
                                    <Rate
                                        disabled
                                        defaultValue={review.rating}
                                    />
                                </div>
                            }
                            description={
                                <div>
                                    <Text>{review.comment}</Text>
                                    <div style={{ marginTop: 8 }}>
                                        <Text type="secondary">
                                            {new Date(
                                                review.createdAt
                                            ).toLocaleDateString()}
                                        </Text>
                                    </div>
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}

export default ProductReview
