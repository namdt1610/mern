import React from 'react'
import { Skeleton, Card } from 'antd'

export default function CheckoutSkeleton() {
    return (
        <div style={{ padding: '20px' }}>
            <Card>
                <Skeleton paragraph={{ rows: 4 }} />
            </Card>
        </div>
    )
}
