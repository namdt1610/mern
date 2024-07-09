const express = require('express')
const router = express.Router()
const userController = require('../../controllers/client/userController')

// Routes cho đăng nhập, đăng ký và làm mới token
router.post('/login', userController.loginUser)
router.post('/signup', userController.signupUser)

module.exports = router
