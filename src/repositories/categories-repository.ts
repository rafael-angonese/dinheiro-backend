import { Meta } from '@/@types/meta';
import { Prisma, Category } from '@prisma/client';

export interface GetCategoriesRequest {
  qs?: string;
  page: number;
  perPage: number;
}

export interface GetCategoriesResponse {
  data: Category[]
  meta: Meta
}

export interface CategoriesRepository {
  list(params: GetCategoriesRequest): Promise<GetCategoriesResponse>;
  findById(id: string): Promise<Category | null>;
  create(data: Prisma.CategoryCreateInput): Promise<Category>;
  update(id: string, data: Prisma.CategoryUpdateInput): Promise<Category>;
  destroy(id: string): Promise<Category | null>;
}
