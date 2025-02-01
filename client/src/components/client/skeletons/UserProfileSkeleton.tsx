import React from 'react'
import { Skeleton, Card } from 'antd'

export default function UserProfileSkeleton() {
    return (
        <div style={{ padding: '20px' }}>
            <Card>
                <Skeleton avatar paragraph={{ rows: 2 }} />
            </Card>
        </div>
    )
}
