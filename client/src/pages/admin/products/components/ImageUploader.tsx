import React, { useState } from 'react'
import { Upload, UploadFile, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

interface ImageUploaderProps {
    value?: UploadFile[]
    onUploadSuccess?: (fileUrl: string) => void
    onChange?: (fileList: UploadFile[]) => void
    modelType: 'product' | 'user' | 'category'
    modelId: string
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
    value = [],
    onUploadSuccess,
    onChange,
    modelType,
    modelId,
}) => {
    const [fileList, setFileList] = useState<UploadFile[]>(value)

    const handleChange = (info: any) => {
        let newFileList = [...info.fileList]

        if (info.file.status === 'done') {
            const imageUrl = info.file.response?.imageUrl
            if (imageUrl) {
                message.success('Tải ảnh lên thành công!')
                onUploadSuccess?.(imageUrl)
                newFileList = newFileList.map((file) =>
                    file.uid === info.file.uid
                        ? {
                              ...file,
                              url: `http://localhost:8888/uploads/${imageUrl}`,
                              status: 'done',
                          }
                        : file
                )
            }
        } else if (info.file.status === 'error') {
            message.error('Tải ảnh lên thất bại!')
        }

        setFileList(newFileList)
    }

    return (
        <Upload
            name="file"
            action="/api/upload"
            method="POST"
            listType="picture-card"
            fileList={fileList}
            data={{ modelType, id: modelId }}
            onChange={handleChange}
            beforeUpload={(file) => {
                if (!file.type.startsWith('image/')) {
                    message.error('Chỉ cho phép tải lên file hình ảnh!')
                    return false
                }
                return true
            }}
        >
            {fileList.length < 1 && (
                <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Tải lên</div>
                </div>
            )}
        </Upload>
    )
}

export default ImageUploader
