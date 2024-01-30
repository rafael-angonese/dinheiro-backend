import { Meta } from '@/@types/meta';
import { CategoriesRepository } from '@/repositories/categories-repository';
import { Category } from '@prisma/client';

interface ListCategoriesServiceRequest {
  qs?: string;
  page: number;
  perPage: number;
}

interface ListCategoriesServiceResponse {
  data: Category[];
  meta: Meta
}

export class ListCategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({
    page,
    qs,
    perPage
  }: ListCategoriesServiceRequest): Promise<ListCategoriesServiceResponse> {
    const { data, meta } = await this.categoriesRepository.list({
      qs,
      page,
      perPage
    });

    return {
      data,
      meta
    };
  }
}
