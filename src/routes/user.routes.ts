import { Router } from 'express'
import { CreateUserController } from '../controllers/users/CreateUserController'
import { ListUserController } from '../controllers/users/ListUserController'

const createUserController = new CreateUserController()
const listUserController = new ListUserController()


const router = Router()

router.get('/', listUserController.handle)
router.post('/', createUserController.handle)

export default router