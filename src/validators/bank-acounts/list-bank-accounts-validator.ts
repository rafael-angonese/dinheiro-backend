import { z } from 'zod';

export const listBankAccountsValidator = z.object({
  q: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  accountId: z.string().uuid(),
});
