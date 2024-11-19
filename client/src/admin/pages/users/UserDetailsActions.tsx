// UserActions.tsx

import React from 'react'
import { Button, Card, Space } from 'antd/lib'
import {
    DeleteOutlined,
    SaveOutlined,
    BackwardOutlined,
} from '@ant-design/icons'

interface UserActionsProps {
    isEditing: boolean
    onSave: () => void
    onEditToggle: () => void
    onDelete: () => void
}

const UserActions: React.FC<UserActionsProps> = ({
    isEditing,
    onSave,
    onEditToggle,
    onDelete,
}) => {
    return (
        <Card className="items-center justify-center flex card-border">
            <Space>
                <Button
                    color="primary"
                    variant="outlined"
                    size="large"
                    icon={<SaveOutlined />}
                    onClick={isEditing ? onSave : onEditToggle}
                >
                    {isEditing ? 'Save' : 'Edit'}
                </Button>
                {isEditing && (
                    <Button
                        color="default"
                        size="large"
                        variant="outlined"
                        icon={<BackwardOutlined />}
                        onClick={onEditToggle}
                    >
                        Cancel
                    </Button>
                )}
                <Button
                    color="danger"
                    variant="outlined"
                    size="large"
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
