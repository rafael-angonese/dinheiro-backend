import { create } from '@/controllers/accounts/create-account-controller';
import { destroy } from '@/controllers/accounts/destroy';
import { list } from '@/controllers/accounts/list-accounts-controller';
import { show } from '@/controllers/accounts/show-account-controller';
import { update } from '@/controllers/accounts/update';
import { Router } from 'express';

const router = Router();

router.get('/', list);
router.post('/', create);
router.get('/:id', show);
router.put('/:id', update);
router.delete('/:id', destroy);

export default router;
