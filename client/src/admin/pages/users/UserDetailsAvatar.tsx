import React, { useState } from 'react'
import { Upload, Avatar, message, Card, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useUploadAvatarMutation } from 'services/UserApi'

interface UserAvatarProps {
    avatar: string
    isEditing: boolean
    onAvatarChange: (file: File) => void
}

const UserAvatar: React.FC<UserAvatarProps> = ({
    avatar,
    isEditing,
    onAvatarChange,
}) => {
    const [previewAvatar, setPreviewAvatar] = useState<string | undefined>(
        avatar
    )
    const [uploadAvatar] = useUploadAvatarMutation()
    const [file, setFile] = useState<File | null>(null)

    const handleFileChange = (info: any) => {
        const { status, originFileObj } = info.file

        if (status === 'done') {
            message.success('Upload thành công')
        } else if (status === 'error') {
            message.error('Đã có lỗi xảy ra trong quá trình tải lên')
        }

        if (originFileObj) {
            setFile(originFileObj) // Lưu file đã chọn
        }
    }

    const handleUpload = () => {
        if (!file) {
            message.error('Vui lòng chọn ảnh trước khi upload')
            return
        }

        const formData = new FormData()
        formData.append('avatar', file)

        uploadAvatar(formData)
            .unwrap() // unwrap để nhận giá trị trả về
            .then((response) => {
                const avatarUrl = response.avatarUrl
                message.success('Upload avatar thành công')
                // Xử lý URL avatar mới như cập nhật state hoặc gửi về server
            })
            .catch((error) => {
                message.error('Upload avatar thất bại')
            })
    }

    return (
        <Card className="card-border text-center">
            {isEditing ? (
                <>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        showUploadList={false}
                        beforeUpload={() => false}
                        onChange={handleFileChange}
                        action="http://localhost:8888/api/upload" // URL API upload ảnh
                    >
                        <div>
                            {previewAvatar ? (
                                <Avatar
                                    src={previewAvatar}
                                    size={200}
                                    className="rounded-full"
                                />
                            ) : (
                                <PlusOutlined />
                            )}
                            <div style={{ marginTop: 8 }}>
                                Thay đổi ảnh đại diện
                            </div>
                        </div>
                    </Upload>
                    <Button onClick={handleUpload} disabled={!file}>
                        Upload Avatar
                    </Button>
                </>
            ) : (
                <Avatar
                    src={previewAvatar}
                    size={200}
                    className="rounded-full object-cover"
                />
            )}
        </Card>
    )
}

export default UserAvatar
