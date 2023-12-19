import { create } from '@/controllers/transactions/create';
import { destroy } from '@/controllers/transactions/destroy';
import { list } from '@/controllers/transactions/list';
import { show } from '@/controllers/transactions/show';
import { update } from '@/controllers/transactions/update';
import { Router } from 'express';
import { multerUploadS3 } from '../config/multer.config';

const router = Router();

router.get('/', list);
router.post('/', multerUploadS3.array('files'), create);
router.get('/:id', show);
router.put('/:id', multerUploadS3.array('files'), update);
router.delete('/:id', destroy);

export default router;
