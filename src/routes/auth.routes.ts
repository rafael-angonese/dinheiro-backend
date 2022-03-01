import { Router } from 'express'
import { AuthenticateController } from '../controllers/auth/AuthenticateController'

const authenticateController = new AuthenticateController()


const router = Router()

router.post('/', authenticateController.handle)


export default router