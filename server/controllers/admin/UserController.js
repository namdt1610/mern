const User = require('../../models/UserModel')

// User login
exports.loginUser = async (req, res) => {
    try {
        res.json({ message: 'Login user' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error login user' })
    }
}

// User logout
exports.signUpUser = async (req, res) => {
    try {
        res.json({ message: 'Sign up user' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error sign up user' })
    }
}
