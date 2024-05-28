import { UserNotFoundError } from '@/errors/users/UserNotFoundError';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { excludeUserPasswordField } from '@/utils/exclude-user-password-field';
import { NextFunction, Request, Response } from 'express';

export async function me(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { userId } = request.auth;

    const usersRepository = new PrismaUsersRepository();
  
    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const usersWithoutPassword = excludeUserPasswordField(user)

    return response.json({
      data: usersWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
}
