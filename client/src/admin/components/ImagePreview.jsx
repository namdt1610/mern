import React from 'react'

const ImagePreview = ({ file, url }) => {
    let src = ''
    if (file) {
        src = URL.createObjectURL(file)
    } else if (url) {
        src = url
    }

    if (!src) {
        return null
    }

    return (
        <div className="image-preview">
            <img
                src={src}
                alt="Preview"
                className="w-full h-auto object-cover rounded-2xl"
            />
        </div>
    )
}

export default ImagePreview
