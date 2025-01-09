import React from 'react'
import { Button, Card, Grid, Space, Popconfirm } from 'antd'
import {
    EditOutlined,
    SaveOutlined,
    CloseOutlined,
    DeleteOutlined,
    ReloadOutlined,
    ArrowLeftOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { useBreakpoint } = Grid

interface InventoryDetailsActionsProps {
    isEditing: boolean
    onEdit: () => void
    onSave: () => void
    onCancel: () => void
    onRefresh: () => void
}

const InventoryDetailsActions: React.FC<InventoryDetailsActionsProps> = ({
    isEditing,
    onEdit,
    onSave,
    onCancel,
    onRefresh,
}) => {
    const screens = useBreakpoint()
    const navigate = useNavigate()

    return (
        <Card className="shadow-md">
            <Space size="middle" wrap className="w-full justify-between">
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate('/admin/inventory')}
                >
                    Back to List
                </Button>

                <Space wrap>
                    <Button icon={<ReloadOutlined />} onClick={onRefresh}>
                        Refresh
                    </Button>

                    {isEditing ? (
                        <>
                            <Button
                                type="primary"
                                icon={<SaveOutlined />}
                                onClick={onSave}
                            >
                                Save Changes
                            </Button>
                            <Button
                                danger
                                icon={<CloseOutlined />}
                                onClick={onCancel}
                            >
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={onEdit}
                            >
                                Edit
                            </Button>
                        </>
                    )}
                </Space>
            </Space>
        </Card>
    )
}

export default InventoryDetailsActions
