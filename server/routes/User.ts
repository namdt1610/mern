import express from 'express'
import * as ac from '../controllers/AuthController'
import * as userController from '../controllers/UserController'
import { upload } from '../middlewares/multerConfig'

const router = express.Router()

// User routes (yêu cầu xác thực)
router.get('/', userController.getAllUsers)
router.get(
    '/:id',
    ac.verifyToken,
    ac.checkRole(['admin', 'user']),
    userController.getUserById
)
router.put(
    '/:id',
    ac.verifyToken,
    ac.checkRole(['admin']),
    upload.single('avatar'),
    userController.updateUser
)
router.delete(
    '/:id',
    ac.verifyToken,
    ac.checkRole(['admin']),
    userController.deleteUser
)

export default router
