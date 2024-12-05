import React from 'react'
import { Upload, Avatar, message, Card } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

interface UserAvatarProps {
    avatar: string
    onAvatarChange: (file: File) => void
    isEditing: boolean
}

const UserAvatar: React.FC<UserAvatarProps> = ({
    avatar,
    onAvatarChange,
    isEditing,
}) => {
    const handleBeforeUpload = (file: File) => {
        const isImage = file.type.startsWith('image/')
        if (!isImage) {
            message.error('You can only upload image files!')
            return false
        }
        const isSmallEnough = file.size / 1024 / 1024 < 2 // < 2MB
        if (!isSmallEnough) {
            message.error('Image must be smaller than 2MB!')
            return false
        }
        return true
    }

    const handleChange = (info: any) => {
        if (info.file.status === 'done' || info.file.originFileObj) {
            const file = info.file.originFileObj || info.file
            const previewUrl = URL.createObjectURL(file)
            onAvatarChange(file) // Gửi file về `UserDetail`
        }
    }

    return (
        <Card className="card-border text-center">
            {isEditing ? (
                <Upload
                    name="avatar"
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={handleBeforeUpload}
                    onChange={handleChange}
                >
                    <div>
                        {avatar ? (
                            <Avatar
                                src={avatar}
                                size={200}
                                className="rounded-full"
                            />
                        ) : (
                            <PlusOutlined />
                        )}
                        <div style={{ marginTop: 8 }}>Change Avatar</div>
                    </div>
                </Upload>
            ) : (
                <Avatar
                    src={avatar}
                    size={200}
                    className="rounded-full object-cover"
                />
            )}
        </Card>
    )
}

export default UserAvatar
