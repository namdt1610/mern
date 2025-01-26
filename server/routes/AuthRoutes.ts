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
 * tags:
 *   name: Authentication
 *   description: Authentication API for user login, registration, token refresh, and logout
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login with user credentials
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful login and token generation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       '400':
 *         description: Invalid credentials or missing fields
 *       '500':
 *         description: Server error
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful registration
 *       '400':
 *         description: Invalid or missing fields
 *       '500':
 *         description: Server error
 */

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh user authentication token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully refreshed access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       '400':
 *         description: Invalid refresh token
 *       '500':
 *         description: Server error
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout the user by invalidating the refresh token
 *     tags: [Authentication]
 *     responses:
 *       '200':
 *         description: Successful logout
 *       '500':
 *         description: Server error
 */
