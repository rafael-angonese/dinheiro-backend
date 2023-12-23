import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { ShowUserService } from '@/services/users/show-user-service';
import { showUserValidator } from '@/validators/users/show-user-validator';
import { NextFunction, Request, Response } from 'express';

export async function show(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { id } = showUserValidator.parse(request.params);

    const usersRepository = new PrismaUsersRepository();
    const useCase = new ShowUserService(usersRepository);

    const user = await useCase.execute({
      id,
    });

    return response.json({
      data: user.user,
    });
  } catch (error) {
    next(error);
  }
}
