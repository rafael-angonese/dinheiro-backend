import { PrismaAccountRepository } from '@/repositories/prisma/prisma-accounts-repository';
import { ListAccountsService } from '@/services/accounts/list-accounts-service';
import { listAccountsValidator } from '@/validators/accounts/list-accounts-validator';
import { NextFunction, Request, Response } from 'express';

export async function list(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { qs, page, perPage } = listAccountsValidator.parse(request.query);
    const { userId } = request.auth;

    const accountsRepository = new PrismaAccountRepository();
    const useCase = new ListAccountsService(accountsRepository);

    const { data, meta } = await useCase.execute({
      qs,
      page,
      perPage,
      userId,
    });

    return response.json({
      data,
      meta
    });
  } catch (error) {
    next(error);
  }
}
