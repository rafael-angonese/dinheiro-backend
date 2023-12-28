import { create } from '@/controllers/categories/create-category-controller';
import { destroy } from '@/controllers/categories/destroy-category-controller';
import { list } from '@/controllers/categories/list-categories-controller';
import { show } from '@/controllers/categories/show-category-controller';
import { update } from '@/controllers/categories/update-category-controller';
import { Router } from 'express';

export const categoryRoutes = Router();

categoryRoutes.get('/', list);
categoryRoutes.post('/', create);
categoryRoutes.get('/:id', show);
categoryRoutes.put('/:id', update);
categoryRoutes.delete('/:id', destroy);
