import { NextFunction, Request, Response } from 'express';
import { DeleteUserService } from '@/services/users/destroy-user-service';
import { showUserValidator } from '@/validators/users/show-user-validator';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';

export async function destroy(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { id } = showUserValidator.parse(request.params);

    const usersRepository = new PrismaUsersRepository();
    const useCase = new DeleteUserService(usersRepository);

    await useCase.execute({
      id,
    });

    return response.status(200).send();
  } catch (error) {
    next(error);
  }
}
