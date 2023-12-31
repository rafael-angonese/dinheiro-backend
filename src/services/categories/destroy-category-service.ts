import { CategoryNotFoundError } from '@/errors/categories/CategoryNotFoundError';
import { CategoriesRepository } from '@/repositories/categories-repository';
import { Category } from '@prisma/client';

interface DestroyCategoryServiceRequest {
  id: string;
}

interface DestroyCategoryServiceResponse {
  category: Category | null;
}

export class DestroyCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({
    id,
  }: DestroyCategoryServiceRequest): Promise<DestroyCategoryServiceResponse> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new CategoryNotFoundError();
    }

    await this.categoriesRepository.destroy(id);

    return {
      category,
    };
  }
}
