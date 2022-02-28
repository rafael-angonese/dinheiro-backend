import { Router } from 'express'

const router = Router()

router.get('/', (_request, response) => {
    return response.json({ hello: 'Welcome to Dentro De Um Critoen!' })
})

export default router