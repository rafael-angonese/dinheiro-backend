import { z } from 'zod';

export const createAccountValidator = z.object({
  name: z.string(),
  description: z.string(),
});
