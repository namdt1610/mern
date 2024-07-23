import { useState } from 'react'
import { useProductsContext } from '../../hooks/useProductsContext'
import ImagePreview from './ImagePreview'

const ProductForm = () => {
    const { dispatch } = useProductsContext()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [imageFile, setImageFile] = useState(null)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFiels] = useState([])

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            console.log('File details:', file)
            if (file instanceof Blob || file instanceof File) {
                setImageFile(file)
            } else {
                console.error('The selected file is not a valid Blob or File.')
                setImageFile(null)
            }
        } else {
            setImageFile(null)
        }
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()

            const formData = new FormData()
            formData.append('name', name)
            formData.append('description', description)
            formData.append('price', price)
            if (imageFile) {
                formData.append('imageUrl', imageFile)
            }

            const response = await fetch('/api/admin/products', {
                method: 'POST',
                body: formData,
            })

            const json = await response.json()

            if (!response.ok) {
                setError(json.error)
                setEmptyFiels(json.emptyFields || [])
            }

            if (response.ok) {
                setName('')
                setDescription('')
                setPrice('')
                setImageFile('')
                setError(null)
                setEmptyFiels([])
                console.log('Product added successfully', json)
                dispatch({ type: 'CREATE_PRODUCT', payload: json })
            }
        } catch (error) {
            console.error('Fetch error:', error)
            setError('Failed to fetch')
        }
    }

    return (
        <form
            className="create p-6 bg-white shadow-md rounded-md"
            onSubmit={handleSubmit}
        >
            <h3 className="text-xl font-semibold mb-4">Add a New Product</h3>

            <label className="block text-sm font-medium mb-1">
                Product Name:
            </label>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={`w-full p-2 mb-4 border rounded-md ${
                    emptyFields.includes('name')
                        ? 'border-red-500'
                        : 'border-gray-300'
                }`}
            />

            <label className="block text-sm font-medium mb-1">
                Product Description:
            </label>
            <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={`w-full p-2 mb-4 border rounded-md ${
                    emptyFields.includes('description')
                        ? 'border-red-500'
                        : 'border-gray-300'
                }`}
            ></textarea>

            <label className="block text-sm font-medium mb-1">
                Product Price:
            </label>
            <input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className={`w-full p-2 mb-4 border rounded-md ${
                    emptyFields.includes('price')
                        ? 'border-red-500'
                        : 'border-gray-300'
                }`}
            />

            <label className="block text-sm font-medium mb-1">
                Product Image:
            </label>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={`w-full p-2 mb-4 border rounded-md ${
                    emptyFields.includes('imageUrl')
                        ? 'border-red-500'
                        : 'border-gray-300'
                }`}
            />
            <ImagePreview file={imageFile} />

            <button className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                Create
            </button>
            {error && <div className="mt-4 text-red-500">{error}</div>}
        </form>
    )
}

export default ProductForm
