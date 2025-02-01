import React from 'react'
import { Skeleton, List } from 'antd'

export default function StoreSkeleton() {
    return (
        <div style={{ padding: '20px' }}>
            <List
                dataSource={[1, 2, 3, 4]}
                renderItem={() => (
                    <List.Item>
                        <Skeleton avatar paragraph={{ rows: 1 }} active />
                    </List.Item>
                )}
            />
        </div>
    )
}
