import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository';
import { ListCategoriesService } from '@/services/categories/list-categories-service';
import { listCategoriesValidator } from '@/validators/categories/list-categories-validator';
import { NextFunction, Request, Response } from 'express';

export async function list(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { q, page } = listCategoriesValidator.parse(request.query);

    const categoriesRepository = new PrismaCategoriesRepository();
    const useCase = new ListCategoriesService(categoriesRepository);

    const { categories } = await useCase.execute({
      query: q,
      page,
    });

    return response.json({
      data: categories,
    });
  } catch (error) {
    next(error);
  }
}
