import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { updateUserValidator } from '@/validators/users/update-user-validator';
import { uuidValidator } from '@/validators/uuid-validator';
import { NextFunction, Request, Response } from 'express';
import { UpdateUserService } from '@/services/users/update-user-service';
import { excludeUserPasswordField } from '@/utils/exclude-user-password-field';

export async function update(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { id } = uuidValidator.parse(request.params);
    const { name, email } = updateUserValidator.parse(request.body);

    const usersRepository = new PrismaUsersRepository();
    const useCase = new UpdateUserService(usersRepository);

    const { user } = await useCase.execute(id, { name, email });

    const userWithoutPassword = excludeUserPasswordField(user);

    return response.json({
      data: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
}
