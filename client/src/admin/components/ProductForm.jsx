import { useState } from 'react'
import { useProductContext } from '../../context/ProductContext'

const ProductForm = () => {
    const { dispatch } = useProductContext()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const product = { name, description, price, imageUrl }

        const response = await fetch('/api/admin/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setName('')
            setDescription('')
            setPrice('')
            setImageUrl('')
            setError(null)
            console.log('Product added successfully', json)
            dispatch({ type: 'CREATE_PRODUCT', payload: json })
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Product</h3>
            <label>Product Name:</label>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />

            <label>Product Description:</label>
            <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
            ></textarea>

            <label>Product Price:</label>
            <input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
            />

            <label>Product Image:</label>
            <input
                type="file"
                onChange={(e) => setImageUrl(e.target.value)}
                value={imageUrl}
            />

            <button>Create</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ProductForm
