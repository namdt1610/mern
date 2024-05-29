const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
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

// Static method to sign up user
userSchema.statics.signUp = async function (email, password) {
    try {
        const exits = await this.findOne({ email })
        if (exits) {
            throw Error('Email already exits')
        }

        // Hash password using bcrypt
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const user = await this.create({ email, password: hashPassword })
        return user
    } catch (error) {
        console.error(error)
        console.log('Error sign up user')
    }
}

const User = mongoose.model('User', userSchema)
module.exports = User
