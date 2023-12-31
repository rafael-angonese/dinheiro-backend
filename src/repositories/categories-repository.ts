import { Prisma, Category } from '@prisma/client';

export interface CategoriesRepository {
  list(query: string, page: number): Promise<Category[]>;
  findById(id: string): Promise<Category | null>;
  create(data: Prisma.CategoryCreateInput): Promise<Category>;
  update(id: string, data: Prisma.CategoryUpdateInput): Promise<Category>;
  destroy(id: string): Promise<Category | null>;
}
