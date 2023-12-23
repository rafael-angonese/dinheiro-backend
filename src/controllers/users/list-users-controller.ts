import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { listUsersValidator } from '@/validators/users/list-users-validator';
import { NextFunction, Request, Response } from 'express';
import { ListUserService } from '@/services/users/list-user-service';

export async function list(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { q, page } = listUsersValidator.parse(request.query);

    const usersRepository = new PrismaUsersRepository();
    const useCase = new ListUserService(usersRepository);

    const data = await useCase.execute({
      query: q,
      page,
    });

    return response.json({
      data: data.users,
    });
  } catch (error) {
    next(error);
  }
}
