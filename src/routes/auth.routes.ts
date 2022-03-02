import { Router } from 'express'
import { AuthenticateController } from '../controllers/auth/AuthenticateController'
import { LogoutController } from '../controllers/auth/LogoutController'
import { RefreshTokenController } from '../controllers/auth/RefreshTokenController'

const authenticateController = new AuthenticateController()
const refreshTokenController = new RefreshTokenController()
const logoutController = new LogoutController()


const router = Router()

router.post('/', authenticateController.handle)
router.post('/refreshToken', refreshTokenController.handle)
router.post('/logout', logoutController.handle)


export default router