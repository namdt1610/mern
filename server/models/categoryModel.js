const mongoose = require('mongoose')
const schema = mongoose.Schema

const categorySchema = new schema({
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
