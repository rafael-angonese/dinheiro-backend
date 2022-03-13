import { Router } from 'express'

import authRoutes from './auth.routes'
import userRoutes from './user.routes'
import accountRoutes from './account.routes'

import authenticated from '../middlewares/authenticated'

const router = Router()

router.get('/', (_request, response) => {
    return response.json({ hello: 'Welcome to Dentro De Um Critoen!' })
})

router.use('/auth', authRoutes)
router.use('/users', authenticated, userRoutes)
router.use('/accounts', authenticated, accountRoutes)

export default router