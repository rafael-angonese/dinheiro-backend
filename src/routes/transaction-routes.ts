import { create } from '@/controllers/transactions/create-transaction-controller';
import { destroy } from '@/controllers/transactions/destroy-transaction-controller';
import { list } from '@/controllers/transactions/list-transactions-controller';
import { show } from '@/controllers/transactions/show-transaction-controller';
import { update } from '@/controllers/transactions/update-transaction-controller';
import { Router } from 'express';

export const transactionRoutes = Router();

transactionRoutes.get('/', list);
transactionRoutes.post('/', create);
transactionRoutes.get('/:id', show);
transactionRoutes.put('/:id', update);
transactionRoutes.delete('/:id', destroy);
