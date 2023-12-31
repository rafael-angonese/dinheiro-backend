import { z } from 'zod';
import { CategoryType } from '@/constants/category-type';

export const createCategoryValidator = z.object({
  name: z.string(),
  type: z.nativeEnum(CategoryType),
});
