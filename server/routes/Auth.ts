import express from 'express'
import * as authController from '../controllers/AuthController'

const router = express.Router()

// Auth routes
router.post('/auth/signup', authController.signup)
router.post('/auth/login', authController.login)
router.post('/auth/refresh', authController.refreshToken)

export default router
