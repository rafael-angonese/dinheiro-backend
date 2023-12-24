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
    const { q, page } = listAccountsValidator.parse(request.query);
    const { user_id } = request.auth;

    const accountsRepository = new PrismaAccountRepository();
    const useCase = new ListAccountsService(accountsRepository);

    const { accounts } = await useCase.execute({
      query: q,
      page,
      userId: user_id,
    });

    return response.json({
      data: accounts,
    });
  } catch (error) {
    next(error);
  }
}
