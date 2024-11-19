// userDetail/UserAvatar.tsx
import { Card } from 'antd/lib'
import React from 'react'
import { useDropzone } from 'react-dropzone'

interface UserAvatarProps {
    avatar: string
    onDrop: (files: File[]) => void
    isEditing: boolean
}

const UserAvatar: React.FC<UserAvatarProps> = ({
    avatar,
    onDrop,
    isEditing,
}) => {
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    })

    return (
        <Card className='card-border rounded-full'>
            {isEditing ? (
                <div
                    {...getRootProps()}
                    style={{
                        border: '2px dashed #ccc',
                        padding: '20px',
                        textAlign: 'center',
                        cursor: 'pointer',
                    }}
                >
                    <input {...getInputProps()} />
                    <img
                        src={avatar}
                        alt="Avatar Preview"
                        style={{ width: 300, height: 300 }}
                        className="rounded-full object-cover"
                    />
                    <p>Drag or click to change the avatar</p>
                </div>
            ) : (
                <img
                    src={avatar}
                    alt="avatar"
                    style={{
                        minWidth: 300,
                        minHeight: 300,
                        borderRadius: '100%',
                        objectFit: 'cover',
                    }}
                />
            )}
        </Card>
    )
}

export default UserAvatar
