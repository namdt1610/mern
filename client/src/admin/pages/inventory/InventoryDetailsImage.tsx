import React from 'react'
import { Card, Image, Upload, message } from 'antd'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import type { UploadChangeParam } from 'antd/es/upload'
import type { RcFile, UploadFile } from 'antd/es/upload/interface'

interface InventoryDetailsImageProps {
    imageUrl?: string
    isEditing: boolean
    onImageChange: (url: string) => void
}

const InventoryDetailsImage: React.FC<InventoryDetailsImageProps> = ({
    imageUrl,
    isEditing,
    onImageChange,
}) => {
    const [loading, setLoading] = React.useState(false)

    const beforeUpload = (file: RcFile) => {
        const isImage = file.type.startsWith('image/')
        if (!isImage) {
            message.error('You can only upload image files!')
            return false
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
            message.error('Image must be smaller than 2MB!')
            return false
        }
        return true
    }

    const handleChange = async (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return
        }
        if (info.file.status === 'done') {
            setLoading(false)
            onImageChange(info.file.response.url)
        }
    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )

    return (
        <Card title="Product Image" className="shadow-md">
            {isEditing ? (
                <Upload
                    name="image"
                    listType="picture-card"
                    showUploadList={false}
                    action="/api/upload"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                >
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt="Product"
                            style={{ width: '100%' }}
                            preview={false}
                        />
                    ) : (
                        uploadButton
                    )}
                </Upload>
            ) : (
                imageUrl && (
                    <Image
                        src={imageUrl}
                        alt="Product"
                        style={{ width: '100%' }}
                    />
                )
            )}
        </Card>
    )
}

export default InventoryDetailsImage
