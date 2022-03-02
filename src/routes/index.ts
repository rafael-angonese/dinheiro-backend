import { Router } from 'express'

import userRoutes from './user.routes'
import authRoutes from './auth.routes'
import authenticated from '../middlewares/authenticated'

const router = Router()

router.get('/', (_request, response) => {
    return response.json({ hello: 'Welcome to Dentro De Um Critoen!' })
})

router.use('/users', authenticated, userRoutes)
router.use('/auth', authRoutes)

export default router