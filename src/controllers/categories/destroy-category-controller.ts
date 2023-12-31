import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository';
import { DestroyCategoryService } from '@/services/categories/destroy-category-service';
import { uuidValidator } from '@/validators/uuid-validator';
import { NextFunction, Request, Response } from 'express';

export async function destroy(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { id } = uuidValidator.parse(request.params);

    const categoriesRepository = new PrismaCategoriesRepository();
    const useCase = new DestroyCategoryService(categoriesRepository);

    await useCase.execute({
      id,
    });

    return response.status(200).send();
  } catch (error) {
    next(error);
  }
}
