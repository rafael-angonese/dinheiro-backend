import { create } from '@/controllers/categories/create-category-controller';
import { destroy } from '@/controllers/categories/destroy-category-controller';
import { list } from '@/controllers/categories/list-categories-controller';
import { show } from '@/controllers/categories/show-category-controller';
import { update } from '@/controllers/categories/update-category-controller';
import { Router } from 'express';

const router = Router();

router.get('/', list);
router.post('/', create);
router.get('/:id', show);
router.put('/:id', update);
router.delete('/:id', destroy);

export default router;
