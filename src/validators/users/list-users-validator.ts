import { z } from 'zod';

export const listUsersValidator = z.object({
  q: z.string(),
  page: z.coerce.number().min(1).default(1),
});
