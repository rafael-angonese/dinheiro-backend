import { create } from '@/controllers/transactions/create-transaction-controller';
import { destroy } from '@/controllers/transactions/destroy-transaction-controller';
import { list } from '@/controllers/transactions/list-transactions-controller';
import { show } from '@/controllers/transactions/show-transaction-controller';
import { update } from '@/controllers/transactions/update-transaction-controller';
import { Router } from 'express';

const router = Router();

router.get('/', list);
router.post('/', create);
router.get('/:id', show);
router.put('/:id', update);
router.delete('/:id', destroy);

export default router;
