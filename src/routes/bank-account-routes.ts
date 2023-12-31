import { create } from '@/controllers/bank-accounts/create-bank-account-controller';
import { destroy } from '@/controllers/bank-accounts/destroy-bank-account-controller';
import { list } from '@/controllers/bank-accounts/list-bank-accounts-controller';
import { show } from '@/controllers/bank-accounts/show-bank-account-controller';
import { update } from '@/controllers/bank-accounts/update-bank-account-service';
import { Router } from 'express';

export const bankAccountRoutes = Router();

bankAccountRoutes.get('/', list);
bankAccountRoutes.post('/', create);
bankAccountRoutes.get('/:id', show);
bankAccountRoutes.put('/:id', update);
bankAccountRoutes.delete('/:id', destroy);
