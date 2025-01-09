import express from 'express'
import * as ac from '../controllers/AuthController'
import * as uc from '../controllers/UserController'

const router = express.Router()

// User routes (yêu cầu xác thực)
router.get('/', uc.getAllUsers)
router.get(
    '/:id',
    ac.verifyToken,
    ac.checkRole(['admin', 'user']),
    uc.getUserById
)
router.put('/:id', ac.verifyToken, ac.checkRole(['admin']), uc.updateUser)
router.delete('/:id', ac.verifyToken, ac.checkRole(['admin']), uc.deleteUser)

export default router

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       '200':
 *         description: A successful response
 * /api/users/{id}:
 *   get:
 *     summary: Get user by id
 *     responses:
 *       '200':
 *         description: A successful response
 * /api/users/{id}:
 *   put:
 *     summary: Update user
 *     responses:
 *       '200':
 *         description: A successful response
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user
 *     responses:
 *       '200':
 *         description: A successful response
*/
