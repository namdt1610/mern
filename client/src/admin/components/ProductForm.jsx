import { useState } from 'react'
import { useProductContext } from '../../context/ProductContext'

const ProductForm = () => {
    const { dispatch } = useProductContext()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFiels] = useState([])

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
            setEmptyFiels(json.emptyFields)
        }

        if (response.ok) {
            setName('')
            setDescription('')
            setPrice('')
            setImageUrl('')
            setError(null)
            setEmptyFiels([])
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
                className={emptyFields.includes('name') ? 'empty' : ''}
            />

            <label>Product Description:</label>
            <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes('description') ? 'empty' : ''}
            ></textarea>

            <label>Product Price:</label>
            <input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className={emptyFields.includes('price') ? 'empty' : ''}
            />

            <label>Product Image:</label>
            <input
                type="file"
                onChange={(e) => setImageUrl(e.target.value)}
                value={imageUrl}
                className={emptyFields.includes('imageUrl') ? 'empty' : ''}
            />

            <button>Create</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ProductForm
