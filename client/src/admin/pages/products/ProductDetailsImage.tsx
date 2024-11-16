import React from 'react'
import { useDropzone } from 'react-dropzone'

interface ProductDetailsImageProps {
    image: string
    onDrop: (files: File[]) => void
    isEditing: boolean
}

const ProductDetailsImage: React.FC<ProductDetailsImageProps> = ({
    image,
    onDrop,
    isEditing,
}) => {
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    })

    return (
        <>
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
                        src={image}
                        alt="Image Preview"
                        style={{ width: 300, height: 300 }}
                        className="rounded object-cover"
                    />
                    <p>Drag or click to change the image</p>
                </div>
            ) : (
                <img
                    src={image}
                    alt="image"
                    style={{
                        width: 300,
                        height: 300,
                        borderRadius: '10%',
                        objectFit: 'cover',
                    }}
                />
            )}
        </>
    )
}

export default ProductDetailsImage
