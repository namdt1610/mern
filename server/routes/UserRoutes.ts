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
router.get('/favorites/:id', ac.verifyToken, uc.getFavoritesById)
router.post('/favorites', ac.verifyToken, uc.addToFavorites)

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
 * /api/users/favorites:
 *  get:
 *   summary: Get user favorites
 *  responses:
 *   '200':
 *   description: A successful response
 * /api/users/favorites/{userId}/{productId}:
 * post:
 * summary: Add to favorites
 * responses:
 * '200':
 * description: A successful response
 * '404':
 * description: User not found
 * '500':
 * description: Could not add to favorites
 * '400':
 * description: Product already in favorites
 *
 */
