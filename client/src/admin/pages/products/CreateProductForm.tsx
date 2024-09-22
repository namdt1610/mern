import React, { useEffect, useState } from 'react'
import styles from './CreateProductForm.module.scss'

interface Category {
    _id: string
    name: string
}

const CreateProductForm = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        imageUrl: '',
        category: '',
        stock: 0,
    })

    // Hàm fetch dữ liệu danh mục từ API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories') // API URL của bạn
                const data = await response.json()
                setCategories(data)
            } catch (error) {
                console.error('Error fetching categories:', error)
            }
        }

        fetchCategories()
    }, [])

    // Xử lý thay đổi trong form
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    // Xử lý submit form
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Logic gửi dữ liệu form lên server
    }

    return (
        <form className={styles.createProductForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <label htmlFor="name">Tên sản phẩm</label>
                <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="description">Mô tả</label>
                <textarea
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="price">Giá</label>
                <input
                    type="number"
                    id="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="imageUrl">URL hình ảnh</label>
                <input
                    type="text"
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="category">Danh mục</label>
                <select
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                >
                    <option value="">Chọn danh mục</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className={styles.submitButton}>
                Tạo sản phẩm
            </button>
        </form>
    )
}

export default CreateProductForm
