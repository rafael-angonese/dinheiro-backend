import { z } from 'zod';

export const updateAccountValidator = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});
