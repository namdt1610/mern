import express from 'express'
import * as authController from '../controllers/AuthController'
import * as userController from '../controllers/UserController'
import { upload } from '../middlewares/multerConfig'

const router = express.Router()

// User routes (yêu cầu xác thực)
router.get('/', userController.getAllUsers)
//router.get('/:id', authController.verifyToken, userController.getUserById)
router.get('/:id', userController.getUserById)
// router.put('/:id', authController.verifyToken, userController.updateUser)
router.put('/:id', upload.single('avatar'), userController.updateUser)
// router.delete('/:id', authController.verifyToken, userController.deleteUser)
router.delete('/:id', userController.deleteUser)

export default router
