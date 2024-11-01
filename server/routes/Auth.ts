import express from 'express'
import * as authController from '../controllers/AuthController'

const router = express.Router()

// Auth routes
router.post('/register', authController.signup)
router.post('/login', authController.login)
router.post('/refresh', authController.refreshToken)

export default router
