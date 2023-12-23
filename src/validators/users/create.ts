import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string(),
  role: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});
