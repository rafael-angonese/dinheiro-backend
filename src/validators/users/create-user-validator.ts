import { z } from 'zod';

export const createUserValidator = z.object({
  name: z.string(),
  role: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});
