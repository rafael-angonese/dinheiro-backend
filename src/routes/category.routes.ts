import { create } from '@/controllers/categories/create';
import { destroy } from '@/controllers/categories/destroy';
import { list } from '@/controllers/categories/list';
import { show } from '@/controllers/categories/show';
import { update } from '@/controllers/categories/update';
import { Router } from 'express';

const router = Router();

router.get('/', list);
router.post('/', create);
router.get('/:id', show);
router.put('/:id', update);
router.delete('/:id', destroy);

export default router;
