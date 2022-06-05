import { Router } from 'express'

import authRoutes from './auth.routes'
import userRoutes from './user.routes'
import accountRoutes from './account.routes'
import bankAccountRoutes from './bank_account.routes'
import categoryRoutes from './category.routes'
import transactionRoutes from './transaction.routes'

import authenticated from '../middlewares/authenticated'

const router = Router()

router.get('/private', (_request, response) => {
    return response.json({ hello: process.env.JWT_PUBLIC_KEY })
})

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/accounts', authenticated, accountRoutes)
router.use('/bank-accounts', authenticated, bankAccountRoutes)
router.use('/categories', authenticated, categoryRoutes)
router.use('/transactions', authenticated, transactionRoutes)

export default router