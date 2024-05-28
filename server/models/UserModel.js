const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: false,
            default: null,
        },
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model('users', userSchema)
module.exports = User
