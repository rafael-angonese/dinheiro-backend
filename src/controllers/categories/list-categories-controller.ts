import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository';
import { ListCategoriesService } from '@/services/categories/list-categories-service';
import { listUsersValidator } from '@/validators/users/list-users-validator';
import { NextFunction, Request, Response } from 'express';

export async function list(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { q, page } = listUsersValidator.parse(request.query);

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
