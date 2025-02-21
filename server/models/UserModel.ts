import { IUser } from '../../shared/types/IUser'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import validator from 'validator'

const schema = mongoose.Schema

const userSchema = new schema(
    {
        avatar: {
            type: String,
            required: false,
            default: null,
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
        name: {
            type: String,
            required: false,
            default: 'New User',
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: false,
            default: null,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        phone: {
            type: String,
            required: false,
            default: null,
        },
        address: {
            type: String,
            required: false,
            default: null,
        },
        favorites: [
            {
                type: schema.Types.ObjectId,
                ref: 'Product',
            },
        ],
        createAt: {
            type: Date,
            default: Date.now,
        },
        updateAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
)

// Static method to sign up user
userSchema.statics.signup = async function (email: string, password: string) {
    if (!email || !password) {
        throw Error('All fields must be filled!')
    }
    if (!validator.isEmail(email)) {
        throw Error('Invalid email!')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough!')
    }
    const exits = await this.findOne({ email })
    if (exits) {
        throw Error('Email already exits')
    }

    // Hash password using bcrypt
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hashPassword })
    return user
}

// Static method to login user
userSchema.statics.login = async function (email: string, password: string) {
    // Check if email and password are filled
    if (!email || !password) {
        throw Error('All fields must be filled!')
    }

    // Check if email exits
    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Email does not exits')
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw Error('Invalid password')
    }
    return user
}

const User = mongoose.model('User', userSchema)
export default User
