import React, { useState, startTransition, useEffect } from 'react'
import { Button, InputNumber, Typography, App } from 'antd'
import { useNavigate } from 'react-router-dom'
import { IProduct } from '@/types/IProduct'
import { IInventory } from '@/types/IInventory'
import { useAddToFavoritesMutation } from '@/services/UserApi'
import { useAddToCartMutation } from '@/services/CartApi'

const { Title, Text } = Typography

export default function ProductInfo({
    userId,
    product,
    stock,
    favorites,
}: {
    userId: string | null | undefined
    product: IProduct
    stock: IInventory | undefined
    favorites: IProduct[] | undefined
}) {
    const [addToCart] = useAddToCartMutation()
    const [addToFav] = useAddToFavoritesMutation()
    const { message } = App.useApp()
    const nav = useNavigate()
    const [quantity, setQuantity] = useState(1)
    const [inCart, setInCart] = useState(false)
    const [inFavorites, setInFavorites] = useState(false)

    const handleChange = (value: number | null) => {
        if (value) {
            startTransition(() => {
                setQuantity(value)
            })
        }
    }

    const handleIncrease = () => setQuantity((prev) => prev + 1)
    const handleDecrease = () =>
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

    useEffect(() => {
        if (favorites) {
            const favIds = favorites.map((fav) => fav._id)
            setInFavorites(favIds.includes(product._id))
        }
    }, [favorites, product._id])

    const handleAddToCart = async () => {
        if (!userId) {
            message.error('Please log in to add to cart')
            throw new Error('User not logged in')
        }

        if (!product._id) {
            console.error('Book not found')
            throw new Error('Book not found')
        }

        try {
            await addToCart({
                userId,
                item: { product_id: product._id, quantity: 1 },
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
            await addToFav({ userId, productId: product._id }).unwrap()
            message.success('Added to favorites')
        } catch (error: any) {
            const errorMessage =
                error?.data?.message ||
                'An error occurred while adding to favorites'
            message.error(errorMessage)
        }
    }
    return (
        <div>
            <div>
                <div>
                    <div>
                        <Title level={3}>{product.name}</Title>
                        <Text strong>Author: </Text>
                        <Text>{product.author}</Text>
                        <br />
                        <Text strong>Price: </Text>
                        <Text>${product.price}</Text>
                        <br />
                        <Text strong>Description: </Text>
                        <Text>{product.description}</Text>
                    </div>
                    <div>
                        {stock ? (
                            <>
                                <Text type="success">In Stock</Text>
                                <br />
                                <Text>Quantity: {stock?.quantity}</Text>
                                <div>
                                    <Button
                                        onClick={handleDecrease}
                                        disabled={quantity === 1}
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
                                        disabled={quantity >= stock?.quantity}
                                    >
                                        +
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <Text type="danger">
                                This items is currently out of stock
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
                            {inCart ? 'Added to Cart' : 'Add to Cart'}
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
                            {inCart ? 'Added to Cart' : 'Buy Now'}
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
                            {inFavorites ? 'Favorited' : 'Add to Favorites'}
                        </Button>
                        <Button
                            type="primary"
                            style={{
                                marginTop: '16px',
                                width: '100%',
                            }}
                            onClick={() => nav('/products')}
                        >
                            Back to products
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
