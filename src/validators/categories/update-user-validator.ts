import { z } from 'zod';

export const updateCategoryValidator = z.object({
  name: z.string().optional(),
  type: z.string().optional(),
});
