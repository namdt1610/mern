import express from 'express'
import * as authController from '../controllers/AuthController'

const router = express.Router()

// Auth routes
router.post('/login', authController.login)
router.post('/register', authController.signup)
router.post('/refresh', authController.refreshToken)
router.post('/logout', authController.logout)

export default router

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login
 *     responses:
 *       '200':
 *         description: A successful response
 * /api/auth/register:
 *   post:
 *     summary: Register
 *     responses:
 *       '200':
 *         description: A successful response
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh token
 *     responses:
 *       '200':
 *         description: A successful response
 * /api/auth/logout:
 *   post:
 *     summary: Logout
 *     responses:
 *       '200':
 *         description: A successful response
 */
