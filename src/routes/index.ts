import { Router } from 'express'

import userRoutes from './user.routes'

const router = Router()

router.get('/', (_request, response) => {
    return response.json({ hello: 'Welcome to Dentro De Um Critoen!' })
})

router.use('/users', userRoutes)

export default router