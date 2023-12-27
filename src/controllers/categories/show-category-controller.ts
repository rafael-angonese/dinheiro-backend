import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository';
import { GetCategoryService } from '@/services/categories/get-category-service';
import { uuidValidator } from '@/validators/uuid-validator';
import { NextFunction, Request, Response } from 'express';

export async function show(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { id } = uuidValidator.parse(request.params);

    const categoriesRepository = new PrismaCategoriesRepository();
    const useCase = new GetCategoryService(categoriesRepository);

    const { category } = await useCase.execute({
      id,
    });

    return response.json({
      data: category,
    });
  } catch (error) {
    next(error);
  }
}
