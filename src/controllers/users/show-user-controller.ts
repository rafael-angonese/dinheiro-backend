import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { GetUserService } from '@/services/users/get-user-service';
import { excludeUserPasswordField } from '@/utils/exclude-user-password-field';
import { uuidValidator } from '@/validators/uuid-validator';
import { NextFunction, Request, Response } from 'express';

export async function show(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { id } = uuidValidator.parse(request.params);

    const usersRepository = new PrismaUsersRepository();
    const useCase = new GetUserService(usersRepository);

    const { user } = await useCase.execute({
      id,
    });

    const userWithoutPassword = excludeUserPasswordField(user);

    return response.json({
      data: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
}
