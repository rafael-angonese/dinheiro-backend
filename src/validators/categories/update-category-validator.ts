import { CategoryType } from '@/constants/category-type';
import { z } from 'zod';

export const updateCategoryValidator = z.object({
  name: z.string().optional(),
  type: z.nativeEnum(CategoryType).optional(),
});
