import { Router } from 'express'
import { CreateUserController } from '../controllers/users/create.controller'
import { DeleteUserController } from '../controllers/users/delete.controller'
import { ListUserController } from '../controllers/users/list.controller'
import { ShowUserController } from '../controllers/users/show.controller'
import { UpdateUserController } from '../controllers/users/update.controller'

const createController = new CreateUserController()
const listController = new ListUserController()
const showController = new ShowUserController()
const updateController = new UpdateUserController()
const deleteController = new DeleteUserController()


const router = Router()

router.get('/', listController.handle)
router.post('/', createController.handle)
router.get('/:id', showController.handle)
router.put('/:id', updateController.handle)
router.delete('/:id', deleteController.handle)

export default router