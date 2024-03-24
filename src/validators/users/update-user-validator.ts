import { z } from 'zod';

export const updateUserValidator = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
});
