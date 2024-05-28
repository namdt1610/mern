const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/UserModel') // Giả định rằng bạn có mô hình User

// Đăng ký người dùng mới
exports.register = async (req, res) => {
    const { name, email, password } = req.body

    try {
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = new User({ name, email, password: hashedPassword })

        await newUser.save()

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        })

        res.status(201).json({ result: newUser, token })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

// Đăng nhập người dùng
exports.login = async (req, res) => {
    const { email, password } = req.body

    try {
        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' })
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
        )

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        const token = jwt.sign(
            { id: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

// Xác thực token
exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: 'No token provided' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id
        next()
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' })
    }
}

// Làm mới token (nếu cần)
exports.refreshToken = (req, res) => {
    // Logic để làm mới token
}
