import { Router } from 'express'
import { CreateAccountController } from '../controllers/accounts/create.controller'
import { DeleteAccountController } from '../controllers/accounts/delete.controller'
import { ListAccountController } from '../controllers/accounts/list.controller'
import { ShowAccountController } from '../controllers/accounts/show.controller'
import { UpdateAccountController } from '../controllers/accounts/update.controller'

const createController = new CreateAccountController()
const listController = new ListAccountController()
const showController = new ShowAccountController()
const updateController = new UpdateAccountController()
const deleteController = new DeleteAccountController()

const router = Router()

router.get('/', listController.handle)
router.post('/', createController.handle)
router.get('/:id', showController.handle)
router.put('/:id', updateController.handle)
router.delete('/:id', deleteController.handle)

export default router