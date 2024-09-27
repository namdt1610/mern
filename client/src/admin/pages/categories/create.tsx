import React, { useState, useContext } from 'react'
import styles from './style.module.scss'
import toast, { Toaster } from 'react-hot-toast'
import { CategoryContext } from '../../../context/CategoryContext'
import axios from 'axios'
import { Button } from 'react-bootstrap'

interface Category {
  name: string
}

const CreateCategoryForm: React.FC = () => {
  const { dispatch } = useContext(CategoryContext)
  const [formData, setFormData] = useState<Category>({
    name: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await axios.post('/api/admin/categories', {
        name: formData.name,
      })
      if (response.data.success) {
        dispatch({ type: 'CREATE_CATEGORY', payload: response.data.category })
        toast.success('Danh mục đã được tạo thành công!')
        console.log('Form data submitted: ', formData)
        getAllCategories()
        setFormData({ name: '' })
      }
    } catch (error) {
      console.log('Lỗi khi tạo danh mục:', error.response.data)
      toast.error('Đã xảy ra lỗi, vui lòng thử lại sau!')
      getAllCategories()
    }
  }

  const getAllCategories = async () => {
    try {
      const response = await axios.get('/api/admin/categories')
      dispatch({ type: 'SET_CATEGORIES', payload: response.data.categories })
    } catch (error) {
      console.error('Lỗi khi lấy danh mục:', error)
    }
  }

  return (
    <>
      <Button variant="primary" onClick={() => getAllCategories()}>
        Refresh
      </Button>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Tên danh mục</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Tạo danh mục
        </button>
        <Toaster />
      </form>
    </>
  )
}

export default CreateCategoryForm
