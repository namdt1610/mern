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
    const { email, password } = req.body

    try {
        const user = await User.signUp(email, password)
        res.status(200).json({email, user})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
