import { Router } from 'express'
import { CreateBankAccountController } from '../controllers/bank_accounts/create.controller'
import { DeleteAccountController } from '../controllers/bank_accounts/delete.controller'
import { ListBankAccountController } from '../controllers/bank_accounts/list.controller'
import { ShowBankAccountController } from '../controllers/bank_accounts/show.controller'
import { UpdateBankAccountController } from '../controllers/bank_accounts/update.controller'

const createController = new CreateBankAccountController()
const listController = new ListBankAccountController()
const showController = new ShowBankAccountController()
const updateController = new UpdateBankAccountController()
const deleteController = new DeleteAccountController()

const router = Router()

router.get('/', listController.handle)
router.post('/', createController.handle)
router.get('/:id', showController.handle)
router.put('/:id', updateController.handle)
router.delete('/:id', deleteController.handle)

export default router