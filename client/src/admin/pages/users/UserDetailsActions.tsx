// UserActions.tsx

import React from 'react'
import { Button, Card, Space, Grid } from 'antd'
import {
    DeleteOutlined,
    SaveOutlined,
    BackwardOutlined,
    ReloadOutlined,
} from '@ant-design/icons'

const { useBreakpoint } = Grid

interface UserActionsProps {
    isEditing: boolean
    onSave: () => void
    onEditToggle: () => void
    onDelete: () => void
    onRefetch: () => void
}

const UserActions: React.FC<UserActionsProps> = ({
    isEditing,
    onSave,
    onEditToggle,
    onDelete,
    onRefetch,
}) => {
    const screens = useBreakpoint()

    return (
        <Card className="items-center justify-center flex card-border">
            <Space wrap direction={screens.xs ? 'vertical' : 'horizontal'}>
                <Button
                    type="primary"
                    size="middle"
                    icon={<ReloadOutlined />}
                    onClick={onRefetch}
                >
                    Refresh
                </Button>
                <Button
                    type="primary"
                    size="middle"
                    icon={<SaveOutlined />}
                    onClick={isEditing ? onSave : onEditToggle}
                >
                    {isEditing ? 'Save' : 'Edit'}
                </Button>
                {isEditing && (
                    <Button
                        type="default"
                        size="middle"
                        icon={<BackwardOutlined />}
                        onClick={onEditToggle}
                    >
                        Cancel
                    </Button>
                )}
                <Button
                    color="danger"
                    size="middle"
                    icon={<DeleteOutlined />}
                    onClick={onDelete}
                >
                    Delete
                </Button>
            </Space>
        </Card>
    )
}

export default UserActions
