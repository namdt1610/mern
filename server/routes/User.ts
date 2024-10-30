import express from 'express'
import * as authController from '../controllers/AuthController'
import * as userController from '../controllers/UserController'

const app = express()
const router = express.Router()

// User routes (yêu cầu xác thực)
router.get('/', authController.verifyToken, userController.getAllUsers)
router.get('/:id', authController.verifyToken, userController.getUserById)
router.put('/:id', authController.verifyToken, userController.updateUser)
router.delete(
    '/users/:id',
    authController.verifyToken,
    userController.deleteUser
)

export default router
