import { create } from '@/controllers/users/create-user-controller';
import { destroy } from '@/controllers/users/destroy-user-controller';
import { list } from '@/controllers/users/list-users-controller';
import { me } from '@/controllers/users/me-users-controller';
import { show } from '@/controllers/users/show-user-controller';
import { update } from '@/controllers/users/update-user-controller';
import { Router } from 'express';

export const userRoutes = Router();

userRoutes.get('/me', me);
userRoutes.get('/', list);
userRoutes.post('/', create);
userRoutes.get('/:id', show);
userRoutes.put('/:id', update);
userRoutes.delete('/:id', destroy);

