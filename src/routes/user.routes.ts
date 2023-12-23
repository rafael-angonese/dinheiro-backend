import { create } from '@/controllers/users/create-user-controller';
import { destroy } from '@/controllers/users/destroy';
import { list } from '@/controllers/users/list-users-controller';
import { show } from '@/controllers/users/show';
import { update } from '@/controllers/users/update';
import { Router } from 'express';

const router = Router();

router.get('/', list);
router.post('/', create);
router.get('/:id', show);
router.put('/:id', update);
router.delete('/:id', destroy);

export default router;
