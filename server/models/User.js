const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema(
    {
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: Number,
            required: true,
            unique: true,
        },
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
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        loginAt: {
            type: Date,
            default: Date.now,
        },
        logoutAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model('users', userSchema)
module.exports = User
