import { ForbiddenError } from '@/errors/ForbiddenError';
import { PrismaAccountRepository } from '@/repositories/prisma/prisma-accounts-repository';
import { GetAccountService } from '@/services/accounts/get-account-service';
import { uuidValidator } from '@/validators/uuid-validator';
import { NextFunction, Request, Response } from 'express';

export async function show(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { id } = uuidValidator.parse(request.params);
    const { user_id } = request.auth;

    const accountsRepository = new PrismaAccountRepository();
    const useCase = new GetAccountService(accountsRepository);

    const { account } = await useCase.execute({
      id,
    });

    if (account.user_id !== user_id) {
      throw new ForbiddenError();
    }

    return response.json({
      data: account,
    });
  } catch (error) {
    next(error);
  }
}
