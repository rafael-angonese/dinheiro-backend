import { authenticate } from '@/controllers/auth/authenticate';
import { logout } from '@/controllers/auth/logout';
import { refreshToken } from '@/controllers/auth/refreshToken';
import { Router } from 'express';

const router = Router();

router.post('/', authenticate);
router.post('/refreshToken', refreshToken);
router.post('/logout', logout);

export default router;
