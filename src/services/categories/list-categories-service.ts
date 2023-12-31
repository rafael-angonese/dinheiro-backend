import { CategoriesRepository } from '@/repositories/categories-repository';
import { Category } from '@prisma/client';

interface ListCategoriesServiceRequest {
  query?: string;
  page: number;
}

interface ListCategoriesServiceResponse {
  categories: Category[];
}

export class ListCategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({
    page,
    query = '',
  }: ListCategoriesServiceRequest): Promise<ListCategoriesServiceResponse> {
    const categories = await this.categoriesRepository.list(query, page);

    return {
      categories,
    };
  }
}
