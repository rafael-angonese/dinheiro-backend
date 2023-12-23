import { httpStatusCode } from '@/errors/http-status-code';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { CreateUserService } from '@/services/users/create.service';
import { createUserValidator } from '@/validators/users/create-user-validator';
import { NextFunction, Request, Response } from 'express';

export async function create(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { name, email, password, role } = createUserValidator.parse(
      request.body,
    );

    const usersRepository = new PrismaUsersRepository();
    const useCase = new CreateUserService(usersRepository);

    await useCase.execute({ name, email, password, role });

    return response.status(httpStatusCode.created).send();
  } catch (error) {
    next(error);
  }
}
