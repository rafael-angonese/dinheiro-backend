import { CategoryNotFoundError } from '@/errors/categories/CategoryNotFoundError';
import { CategoriesRepository } from '@/repositories/categories-repository';
import { Category } from '@prisma/client';

interface UpdateCategoryServiceRequest {
  name?: string;
  type?: string;
}

interface UpdateCategoryServiceResponse {
  category: Category;
}

export class UpdateCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute(
    id: string,
    { name, type }: UpdateCategoryServiceRequest,
  ): Promise<UpdateCategoryServiceResponse> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new CategoryNotFoundError();
    }

    const updatedCategory = await this.categoriesRepository.update(id, {
      name,
      type,
    });

    return {
      category: updatedCategory,
    };
  }
}
