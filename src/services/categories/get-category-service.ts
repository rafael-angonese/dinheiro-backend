import { CategoryNotFoundError } from '@/errors/categories/CategoryNotFoundError';
import { CategoriesRepository } from '@/repositories/categories-repository';
import { Category } from '@prisma/client';

interface GetCategoryServiceRequest {
  id: string;
}

interface GetCategoryServiceResponse {
  category: Category;
}

export class GetCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({
    id,
  }: GetCategoryServiceRequest): Promise<GetCategoryServiceResponse> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new CategoryNotFoundError();
    }

    return {
      category,
    };
  }
}
