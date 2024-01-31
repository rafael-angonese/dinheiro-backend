import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { listUsersValidator } from '@/validators/users/list-users-validator';
import { NextFunction, Request, Response } from 'express';
import { ListUserService } from '@/services/users/list-user-service';
import { excludeUserPasswordField } from '@/utils/exclude-user-password-field';

export async function list(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { qs, page, perPage } = listUsersValidator.parse(request.query);

    const usersRepository = new PrismaUsersRepository();
    const useCase = new ListUserService(usersRepository);

    const { data, meta } = await useCase.execute({
      qs,
      page,
      perPage
    });

    const usersWithoutPassword = data.map((user) =>
      excludeUserPasswordField(user),
    );

    return response.json({
      data: usersWithoutPassword,
      meta
    });
  } catch (error) {
    next(error);
  }
}
