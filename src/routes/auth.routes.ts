import { authenticate } from '@/controllers/auth/authenticate-controller';
import { logout } from '@/controllers/auth/logout-controller';
import { refreshToken } from '@/controllers/auth/refresh-token-controller';
import authenticated from '@/middlewares/authenticated';
import { Router } from 'express';

const router = Router();

router.post('/', authenticate);
router.post('/refreshToken', authenticated, refreshToken);
router.post('/logout', authenticated, logout);

export default router;
