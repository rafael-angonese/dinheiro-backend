import { Router } from 'express';

import authenticated from '@/middlewares/authenticated';
import { accountRoutes } from '@/routes/account-routes';
import { authRoutes } from '@/routes/auth-routes';
import { bankAccountRoutes } from '@/routes/bank-account-routes';
import { categoryRoutes } from '@/routes/category-routes';
import { transactionRoutes } from '@/routes/transaction-routes';
import { userRoutes } from '@/routes/user-routes';

const router = Router();

router.get('/', (_request, response) => {
  return response.json({ hello: 'Welcome to Dentro De Um Critoen!' });
});

router.use('/auth', authRoutes);
router.use('/users', authenticated, userRoutes);
router.use('/accounts', authenticated, accountRoutes);
router.use('/bank-accounts', authenticated, bankAccountRoutes);
router.use('/categories', authenticated, categoryRoutes);
router.use('/transactions', authenticated, transactionRoutes);

export default router;
