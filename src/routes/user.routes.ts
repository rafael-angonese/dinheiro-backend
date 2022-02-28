import { Router } from 'express'
import { CreateUserController } from '../controllers/users/CreateUserController'
import { ListUserController } from '../controllers/users/ListUserController'
import { ShowUserController } from '../controllers/users/ShowUserController'

const createUserController = new CreateUserController()
const listUserController = new ListUserController()
const showUserController = new ShowUserController()


const router = Router()

router.get('/', listUserController.handle)
router.post('/', createUserController.handle)
router.get('/:id', showUserController.handle)

export default router