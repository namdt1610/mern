import exp from 'constants'

const mongoose = require('mongoose')
const schema = mongoose.Schema

const categorySchema = new schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
})

const Category = mongoose.model('Category', categorySchema)
export default Category
