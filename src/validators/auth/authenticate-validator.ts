import { z } from 'zod';

export const authenticateValidator = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
