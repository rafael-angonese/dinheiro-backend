import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { DestroyUserService } from '@/services/users/destroy-user-service';
import { uuidValidator } from '@/validators/uuid-validator';
import { NextFunction, Request, Response } from 'express';

export async function destroy(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { id } = uuidValidator.parse(request.params);

    const usersRepository = new PrismaUsersRepository();
    const useCase = new DestroyUserService(usersRepository);

    await useCase.execute({
      id,
    });

    return response.status(200).send();
  } catch (error) {
    next(error);
  }
}
