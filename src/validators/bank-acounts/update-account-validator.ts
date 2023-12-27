import { z } from 'zod';

export const updateBankAccountValidator = z.object({
  name: z.string().optional(),
  balance: z.number().optional(),
});
