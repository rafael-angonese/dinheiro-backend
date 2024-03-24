import { httpStatusCode } from '@/errors/http-status-code';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { CreateUserService } from '@/services/users/create-user-service';
import { excludeUserPasswordField } from '@/utils/exclude-user-password-field';
import { createUserValidator } from '@/validators/users/create-user-validator';
import { NextFunction, Request, Response } from 'express';

export async function create(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { name, email, password } = createUserValidator.parse(
      request.body,
    );

    const usersRepository = new PrismaUsersRepository();
    const useCase = new CreateUserService(usersRepository);

    const { user } = await useCase.execute({ name, email, password });

    const userWithoutPassword = excludeUserPasswordField(user);

    return response.status(httpStatusCode.created).json({
      data: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
}
