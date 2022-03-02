import { Router } from 'express'
import { AuthenticateController } from '../controllers/auth/AuthenticateController'
import { RefreshTokenController } from '../controllers/auth/RefreshTokenController'

const authenticateController = new AuthenticateController()
const refreshTokenController = new RefreshTokenController()


const router = Router()

router.post('/', authenticateController.handle)
router.post('/refreshToken', refreshTokenController.handle)


export default router