import React, {useState} from 'react'
import {Card, message, Upload} from 'antd'
import {PlusOutlined} from '@ant-design/icons'

interface ProductImageProps {
      image: string
      isEditing: boolean
      onImageChange: (imageUrl: string) => void
}

const ProductImage: React.FC<ProductImageProps> = ({
      image,
      isEditing,
      onImageChange,
}) => {
      const [previewImage, setPreviewImage] = useState<string>(image)

      // Validate file before upload
      const handleBeforeUpload = (file: File) => {
            const isImage = file.type.startsWith('image/')
            if (!isImage) {
                  message.error('You can only upload image files!')
                  return false
            }
            const isSmallEnough = file.size / 1024 / 1024 < 2 // Less than 2MB
            if (!isSmallEnough) {
                  message.error('Image must be smaller than 2MB!')
                  return false
            }
            return true
      }

      // Handle file change
      const handleChange = (info: any) => {
            const { status, originFileObj } = info.file

            if (originFileObj) {
                  const previewUrl = URL.createObjectURL(originFileObj)
                  setPreviewImage(previewUrl)
            }

            if (status === 'done') {
                  const response = info.file.response
                  if (response && response.file.imageUrl) {
                        message.success('Image uploaded successfully!')
                        onImageChange(response.file.imageUrl)
                  }
            }

            if (status === 'error') {
                  message.error('Image upload failed!')
            }
      }

      return (
            <Card className="card-border text-center">
                  {isEditing ? (
                        <Upload
                              name="image"
                              listType="picture-card"
                              showUploadList={false}
                              beforeUpload={handleBeforeUpload}
                              onChange={handleChange}
                              action="http://localhost:8888/api/upload"
                        >
                              <div>
                                    {previewImage ? (
                                          <img
                                                src={previewImage}
                                                alt="Product"
                                                style={{
                                                      width: '100%',
                                                      height: '300px',
                                                      objectFit: 'cover',
                                                }}
                                          />
                                    ) : (
                                          <div>
                                                <PlusOutlined />
                                                <div style={{ marginTop: 8 }}>
                                                      Upload Product Image
                                                </div>
                                          </div>
                                    )}
                              </div>
                        </Upload>
                  ) : (
                        <img
                              src={previewImage || '/img/default-product.png'}
                              alt="Product"
                              style={{
                                    width: '100%',
                                    height: '300px',
                                    objectFit: 'cover',
                              }}
                        />
                  )}
            </Card>
      )
}

export default ProductImage