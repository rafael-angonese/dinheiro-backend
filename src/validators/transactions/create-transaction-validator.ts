import { TransactionType } from '@/constants/transaction-type';
import { z } from 'zod';

export const createTransactionValidator = z.object({
  date: z.coerce.date(),
  description: z.string(),
  amount: z.number(),
  type: z.nativeEnum(TransactionType),
  categoryId: z.string().uuid(),
  bankAccountId: z.string().uuid(),
});
