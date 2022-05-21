import { Router } from 'express'
import { multerUploadS3 } from '../config/multer.config'
import { CreateTransactionController } from '../controllers/transactions/create.controller'
import { DeleteTransactionController } from '../controllers/transactions/delete.controller'
import { ListTransactionController } from '../controllers/transactions/list.controller'
import { ShowTransactionController } from '../controllers/transactions/show.controller'
import { UpdateTransactionController } from '../controllers/transactions/update.controller'

const createController = new CreateTransactionController()
const listController = new ListTransactionController()
const showController = new ShowTransactionController()
const updateController = new UpdateTransactionController()
const deleteController = new DeleteTransactionController()

const router = Router()

router.get('/', listController.handle)
router.post('/', multerUploadS3.array('files'), createController.handle)
router.get('/:id', showController.handle)
router.put('/:id', updateController.handle)
router.delete('/:id', deleteController.handle)

export default router