import { Router } from 'express'
import { CreateUserController } from '../controllers/users/CreateUserController'
import { ListUserController } from '../controllers/users/ListUserController'
import { ShowUserController } from '../controllers/users/ShowUserController'
import { UpdateUserController } from '../controllers/users/UpdateUserController'

const createUserController = new CreateUserController()
const listUserController = new ListUserController()
const showUserController = new ShowUserController()
const updateUserController = new UpdateUserController()


const router = Router()

router.get('/', listUserController.handle)
router.post('/', createUserController.handle)
router.get('/:id', showUserController.handle)
router.put('/:id', updateUserController.handle)

export default router