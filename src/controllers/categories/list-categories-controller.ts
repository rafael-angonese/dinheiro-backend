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
    const { qs, page, perPage } = listCategoriesValidator.parse(request.query);

    const categoriesRepository = new PrismaCategoriesRepository();
    const useCase = new ListCategoriesService(categoriesRepository);

    const { data, meta } = await useCase.execute({
      qs,
      page,
      perPage
    });

    return response.json({
      data,
      meta
    });
  } catch (error) {
    next(error);
  }
}
