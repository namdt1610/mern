import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Row, Col, Space, message } from 'antd'
import { useGetInventoryByIdQuery, useUpdateInventoryMutation } from '@/services/InventoryApi'
import DetailsActions from './InventoryDetailsActions'
import DetailsForm from './InventoryDetailsForm'
import LoadingError from '@/components/LoadingError'
import { Inventory } from 'shared/types/Inventory'

const InventoryDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [isEditing, setIsEditing] = useState(false)
    const [editedInventory, setEditedInventory] = useState<Partial<Inventory>>({})
    
    const { 
        data: inventory, 
        isLoading,
        isError,
        refetch 
    } = useGetInventoryByIdQuery(id!)
    
    const [updateInventory] = useUpdateInventoryMutation()

    useEffect(() => {
        if (inventory) {
            setEditedInventory(inventory)
        }
    }, [inventory])

    const handleSave = async () => {
        try {
            await updateInventory({
                id: id!,
                data: editedInventory
            }).unwrap()
            
            message.success('Inventory updated successfully')
            setIsEditing(false)
            refetch()
        } catch (error) {
            message.error('Failed to update inventory')
        }
    }

    if (isLoading || isError) {
        return <LoadingError isLoading={isLoading} isError={isError} refetch={refetch} isLogin={false} title="Inventory" />
    }

    return (
        <div className="p-6">
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <DetailsActions
                    isEditing={isEditing}
                    onEdit={() => setIsEditing(true)}
                    onSave={handleSave}
                    onCancel={() => setIsEditing(false)}
                    onRefresh={refetch}
                />
                
                <Row gutter={[16, 16]}>
                    <Col xs={24} lg={16}>
                        <DetailsForm
                            inventory={inventory!}
                            isEditing={isEditing}
                            editedInventory={editedInventory}
                            onChange={(field, value) => 
                                setEditedInventory(prev => ({
                                    ...prev,
                                    [field]: value
                                }))
                            }
                        />
                    </Col>
                </Row>
            </Space>
        </div>
    )
}

export default InventoryDetails
