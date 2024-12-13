import React from 'react'
import { Button, Card, Space, Grid } from 'antd'
import {
      DeleteOutlined,
      SaveOutlined,
      BackwardOutlined,
      ReloadOutlined,
} from '@ant-design/icons'

const { useBreakpoint } = Grid

interface InventoryActionsProps {
      isEditing: boolean
      onSave: () => void
      onEditToggle: () => void
      onDelete: () => void
      onRefetch: () => void
}

const InventoryActions: React.FC<InventoryActionsProps> = ({
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
                              className="btn-border btn-hover"
                        >
                              Refresh
                        </Button>
                        <Button
                              type="primary"
                              size="middle"
                              icon={<SaveOutlined />}
                              onClick={isEditing ? onSave : onEditToggle}
                              className="btn-border btn-hover"
                        >
                              {isEditing ? 'Save' : 'Edit'}
                        </Button>
                        {isEditing && (
                              <Button
                                    type="default"
                                    size="middle"
                                    icon={<BackwardOutlined />}
                                    onClick={onEditToggle}
                                    className="btn-border btn-hover"
                              >
                                    Cancel
                              </Button>
                        )}
                        <Button
                              danger
                              size="middle"
                              icon={<DeleteOutlined />}
                              onClick={onDelete}
                              className="btn-border btn-hover"
                        >
                              Delete
                        </Button>
                  </Space>
            </Card>
      )
}

export default InventoryActions