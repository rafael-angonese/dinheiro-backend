import { httpStatusCode } from '@/errors/http-status-code';
import { PrismaAccountRepository } from '@/repositories/prisma/prisma-accounts-repository';
import { CreateAccountService } from '@/services/accounts/create-account-service';
import { createAccountValidator } from '@/validators/accounts/create-account-validator';
import { NextFunction, Request, Response } from 'express';

export async function create(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { name, description } = createAccountValidator.parse(request.body);
    const { user_id } = request.auth;

    const accountsRepository = new PrismaAccountRepository();
    const useCase = new CreateAccountService(accountsRepository);

    const { account } = await useCase.execute({
      name,
      description,
      userId: user_id,
    });

    return response.status(httpStatusCode.created).json({
      data: account,
    });
  } catch (error) {
    next(error);
  }
}
