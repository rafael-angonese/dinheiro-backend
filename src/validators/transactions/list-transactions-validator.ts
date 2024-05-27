import { DEFAULT_PER_PAGE } from '@/constants/default-per-page';
import { z } from 'zod';

export const listTransactionsValidator = z.object({
  qs: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  perPage: z.coerce.number().min(1).default(DEFAULT_PER_PAGE),
  categoryId: z.string().uuid().optional(),
  bankAccountId: z.string().uuid().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});
