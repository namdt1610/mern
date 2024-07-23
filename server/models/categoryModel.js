const mongoose = require('mongoose')
const schema = mongoose.Schema

const categorySchema = new schema({
    id: {
        type: String,
        required: true,
        unique: true,
        autoIncrement: true,
    },
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        default: null,
    },
})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category
