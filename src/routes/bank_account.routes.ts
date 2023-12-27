import { create } from '@/controllers/bank-accounts/create-bank-account-controller';
import { destroy } from '@/controllers/bank-accounts/destroy-bank-account-controller';
import { list } from '@/controllers/bank-accounts/list-bank-accounts-controller';
import { show } from '@/controllers/bank-accounts/show-bank-account-controller';
import { update } from '@/controllers/bank-accounts/update-bank-account-service';
import { Router } from 'express';

const router = Router();

router.get('/', list);
router.post('/', create);
router.get('/:id', show);
router.put('/:id', update);
router.delete('/:id', destroy);

export default router;
