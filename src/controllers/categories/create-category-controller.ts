import { httpStatusCode } from '@/errors/http-status-code';
import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository';
import { CreateCategoryService } from '@/services/categories/create-category-service';
import { createCategoryValidator } from '@/validators/categories/create-category-validator';
import { NextFunction, Request, Response } from 'express';

export async function create(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { name, type } = createCategoryValidator.parse(request.body);

    const categoriesRepository = new PrismaCategoriesRepository();
    const useCase = new CreateCategoryService(categoriesRepository);

    const { category } = await useCase.execute({ name, type });

    return response.status(httpStatusCode.created).json({
      data: category,
    });
  } catch (error) {
    next(error);
  }
}
