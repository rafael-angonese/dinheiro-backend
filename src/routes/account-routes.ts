import { create } from '@/controllers/accounts/create-account-controller';
import { destroy } from '@/controllers/accounts/destroy-account-controller';
import { list } from '@/controllers/accounts/list-accounts-controller';
import { show } from '@/controllers/accounts/show-account-controller';
import { update } from '@/controllers/accounts/update-account-service';
import { Router } from 'express';

export const accountRoutes = Router();

accountRoutes.get('/', list);
accountRoutes.post('/', create);
accountRoutes.get('/:id', show);
accountRoutes.put('/:id', update);
accountRoutes.delete('/:id', destroy);
