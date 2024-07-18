const mongoose = require('mongoose')
const schema = moongoose.Schema

const categorySchema = new schema({
    _id: {
        type: String,
        required: true,
        unique: true,
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