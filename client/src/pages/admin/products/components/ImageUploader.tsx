import React from 'react'
import { Upload, UploadProps, Image, message } from 'antd'
import { RcFile, UploadFile } from 'antd/es/upload'

interface ImageUploaderProps {
    value?: UploadFile[] // Nhận fileList từ Form
    onChange?: (fileList: UploadFile[]) => void // Callback để cập nhật giá trị lên Form
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
    value = [],
    onChange,
}) => {
    const handleImageChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} tải lên thành công`)
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} tải lên thất bại`)
        }
        onChange?.(info.fileList) // Cập nhật danh sách file lên Form
    }

    return (
        <Upload
            name="file"
            action="/upload" // API upload
            listType="picture-card"
            fileList={value} // Nhận từ Form
            onChange={handleImageChange}
            beforeUpload={(file: RcFile) => {
                const isImage = file.type.startsWith('image/')
                if (!isImage) {
                    message.error('Chỉ cho phép tải lên file hình ảnh!')
                }
                return isImage
            }}
        >
            {value.length === 0 ? <div>+ Tải lên</div> : null}
        </Upload>
    )
}

export default ImageUploader
