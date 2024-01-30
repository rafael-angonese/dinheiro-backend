import { DEFAULT_PER_PAGE } from '@/constants/default-per-page';
import { z } from 'zod';

export const listBankAccountsValidator = z.object({
  qs: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  accountId: z.string().uuid(),
  perPage: z.coerce.number().min(1).default(DEFAULT_PER_PAGE),
});
