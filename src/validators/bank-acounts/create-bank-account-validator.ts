import { z } from 'zod';

export const createBankAccountValidator = z.object({
  name: z.string(),
  balance: z.number(),
});
