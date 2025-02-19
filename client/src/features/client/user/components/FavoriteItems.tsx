import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, List } from 'antd'
import { useGetFavoritesQuery } from '@/services/UserApi'
import { formatCurrency } from '@/utils/formatCurrency'

export default function FavoriteItems({ userId }: { userId: string }) {
    const { data: favorites = [], isLoading } = useGetFavoritesQuery(userId!)

    return (
        <List
            loading={isLoading}
            grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4 }}
            dataSource={favorites}
            renderItem={(item: any) => (
                <List.Item>
                    <Card
                        hoverable
                        cover={<img alt={item.name} src={item.imageUrl} />}
                    >
                        <Card.Meta
                            title={item.name}
                            description={formatCurrency(item.price)}
                        />
                        <Link to={`/product/${item._id}`}>
                            <Button type="primary" className="mt-4">
                                View Details
                            </Button>
                        </Link>
                    </Card>
                </List.Item>
            )}
        />
    )
}
