import React from 'react'
import { Button, Card, Space } from 'antd'
import { ArrowLeftOutlined, PrinterOutlined } from '@ant-design/icons'

interface OrderHeaderProps {
    onBack: () => void
}

export default function OrderHeader({ onBack }: OrderHeaderProps) {
    return (
        <Card className="shadow-sm">
            <Space className="w-full justify-between">
                <Button icon={<ArrowLeftOutlined />} onClick={onBack}>
                    Back to Orders
                </Button>
            </Space>
        </Card>
    )
}
