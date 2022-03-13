import { Router } from 'express'
import { CreateCategoryController } from '../controllers/categories/create.controller'
import { DeleteCategoryController } from '../controllers/categories/delete.controller'
import { ListCategoryController } from '../controllers/categories/list.controller'
import { ShowCategoryController } from '../controllers/categories/show.controller'
import { UpdateCategoryController } from '../controllers/categories/update.controller'

const createController = new CreateCategoryController()
const listController = new ListCategoryController()
const showController = new ShowCategoryController()
const updateController = new UpdateCategoryController()
const deleteController = new DeleteCategoryController()

const router = Router()

router.get('/', listController.handle)
router.post('/', createController.handle)
router.get('/:id', showController.handle)
router.put('/:id', updateController.handle)
router.delete('/:id', deleteController.handle)

export default router