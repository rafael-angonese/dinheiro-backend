import { CategoryType } from '@prisma/client';
import { z } from 'zod';

export const createCategoryValidator = z.object({
  name: z.string(),
  type: z.nativeEnum(CategoryType),
});
