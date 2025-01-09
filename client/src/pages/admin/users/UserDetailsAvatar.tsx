import React, {useState} from 'react'
import {Avatar, Card, message, Upload} from 'antd'
import {PlusOutlined} from '@ant-design/icons'

interface UserAvatarProps {
    avatar: string // URL ảnh ban đầu (có thể null nếu chưa có avatar)
    isEditing: boolean // Trạng thái đang chỉnh sửa
    onAvatarChange: (avatarUrl: string) => void // Callback gửi URL lên component cha
}

const UserAvatar: React.FC<UserAvatarProps> = ({
    avatar,
    isEditing,
    onAvatarChange,
}) => {
    const [previewAvatar, setPreviewAvatar] = useState<string>(avatar) // State lưu URL preview ảnh

    // Kiểm tra file trước khi upload
    const handleBeforeUpload = (file: File) => {
        const isImage = file.type.startsWith('image/')
        if (!isImage) {
            message.error('Bạn chỉ có thể upload file hình ảnh!')
            return false
        }
        const isSmallEnough = file.size / 1024 / 1024 < 2 // Dung lượng dưới 10MB
        if (!isSmallEnough) {
            message.error('Ảnh phải nhỏ hơn 2MB!')
            return false
        }
        return true
    }

    // Xử lý khi thay đổi file
    const handleChange = (info: any) => {
        const { status, originFileObj } = info.file
        console.log('File info:', info.file)

        const previewUrl = URL.createObjectURL(originFileObj)
        if (originFileObj) {
            // Tạo preview từ file ảnh được chọn
            setPreviewAvatar(previewUrl) // Cập nhật preview ảnh
        }

        if (status === 'done') {
            const response = info.file.response // API trả về URL của ảnh đã upload
            if (response && response.file.avatarUrl) {
                // Test
                message.success('Upload ảnh thành công!')
                console.log('Phản hồi từ API:', info.file.response)
                console.log(response.file.avatarUrl)
                
                // setPreviewAvatar(response.avatarUrl) // Hiển thị ảnh từ server
                onAvatarChange(response.file.avatarUrl) // Gửi URL lên component cha
            }
        }

        if (status === 'error') {
            message.error('Upload ảnh thất bại!')
        }
    }

    return (
        <Card className="card-border text-center">
            {isEditing ? (
                <Upload
                    name="avatar"
                    listType="picture"
                    showUploadList={false} // Không hiển thị danh sách ảnh
                    beforeUpload={handleBeforeUpload} // Kiểm tra file
                    onChange={handleChange} // Xử lý sự kiện thay đổi file
                    action="http://localhost:8888/api/upload" // URL API upload
                >
                    <div>
                        {previewAvatar ? (
                            // Hiển thị preview ảnh
                            <Avatar
                                src={previewAvatar}
                                size={300}
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
            ) : (
                // Hiển thị avatar khi không ở chế độ chỉnh sửa
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
