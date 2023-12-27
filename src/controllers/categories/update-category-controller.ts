import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository';
import { UpdateCategoryService } from '@/services/categories/update-category-service';
import { updateCategoryValidator } from '@/validators/categories/update-user-validator';
import { uuidValidator } from '@/validators/uuid-validator';
import { NextFunction, Request, Response } from 'express';

export async function update(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { id } = uuidValidator.parse(request.params);
    const { name, type } = updateCategoryValidator.parse(request.body);

    const categoriesRepository = new PrismaCategoriesRepository();
    const useCase = new UpdateCategoryService(categoriesRepository);

    const { category } = await useCase.execute(id, { name, type });

    return response.json({
      data: category,
    });
  } catch (error) {
    next(error);
  }
}
