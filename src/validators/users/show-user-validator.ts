import { z } from 'zod';

export const showUserValidator = z.object({
  id: z.string().uuid(),
});
