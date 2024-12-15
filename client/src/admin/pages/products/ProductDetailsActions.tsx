// ProductDetailsActions.tsx

import React from 'react'
import {Button, Space} from 'antd/lib'
import {BackwardOutlined, DeleteOutlined, SaveOutlined,} from '@ant-design/icons'

interface ProductActionsProps {
    isEditing: boolean
    onSave: () => void
    onEditToggle: () => void
    onDelete: () => void
}

const ProductActions: React.FC<ProductActionsProps> = ({
    isEditing,
    onSave,
    onEditToggle,
    onDelete,
}) => {
    return (
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
    )
}

export default ProductActions
