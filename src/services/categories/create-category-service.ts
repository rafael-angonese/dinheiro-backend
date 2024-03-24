import { CategoriesRepository } from '@/repositories/categories-repository';
import { Category, CategoryType } from '@prisma/client';

interface CreateCategoryServiceRequest {
  name: string;
  type: CategoryType;
}

interface CreateCategoryServiceResponse {
  category: Category;
}

export class CreateCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({
    name,
    type,
  }: CreateCategoryServiceRequest): Promise<CreateCategoryServiceResponse> {
    const category = await this.categoriesRepository.create({
      name,
      type,
    });

    return {
      category,
    };
  }
}
