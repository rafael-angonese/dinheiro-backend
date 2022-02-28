import { Router } from 'express'
import { CreateUserController } from '../controllers/users/CreateUserController'

const createUserController = new CreateUserController()

const router = Router()

router.post('/', createUserController.handle)

export default router