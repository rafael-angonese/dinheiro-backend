import { Router } from 'express'
import { CreateAccountController } from '../controllers/accounts/CreateAccountController'
import { DeleteAccountController } from '../controllers/accounts/DeleteAccountController'
import { ListAccountController } from '../controllers/accounts/ListAccountController'
import { ShowAccountController } from '../controllers/accounts/ShowAccountController'
import { UpdateAccountController } from '../controllers/accounts/UpdateAccountController'

const createAccountController = new CreateAccountController()
const listAccountController = new ListAccountController()
const showAccountController = new ShowAccountController()
const updateAccountController = new UpdateAccountController()
const deleteAccountController = new DeleteAccountController()


const router = Router()

router.get('/', listAccountController.handle)
router.post('/', createAccountController.handle)
router.get('/:id', showAccountController.handle)
router.put('/:id', updateAccountController.handle)
router.delete('/:id', deleteAccountController.handle)
 
export default router