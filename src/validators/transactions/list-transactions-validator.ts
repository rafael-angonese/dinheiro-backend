import { z } from 'zod';

export const listTransactionsValidator = z.object({
  q: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  categoryId: z.string().uuid().optional(),
  accountId: z.string().uuid().optional(),
  bankAccountId: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});
