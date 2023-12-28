import { authenticate } from '@/controllers/auth/authenticate-controller';
import { logout } from '@/controllers/auth/logout-controller';
import { refreshToken } from '@/controllers/auth/refresh-token-controller';
import authenticated from '@/middlewares/authenticated';
import { Router } from 'express';

export const authRoutes = Router();

authRoutes.post('/', authenticate);
authRoutes.post('/refreshToken', authenticated, refreshToken);
authRoutes.post('/logout', authenticated, logout);
