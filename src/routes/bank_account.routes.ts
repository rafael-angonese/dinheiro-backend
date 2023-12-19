import { create } from '@/controllers/bank_accounts/create';
import { destroy } from '@/controllers/bank_accounts/destroy';
import { list } from '@/controllers/bank_accounts/list';
import { show } from '@/controllers/bank_accounts/show';
import { update } from '@/controllers/bank_accounts/update';
import { Router } from 'express';

const router = Router();

router.get('/', list);
router.post('/', create);
router.get('/:id', show);
router.put('/:id', update);
router.delete('/:id', destroy);

export default router;
