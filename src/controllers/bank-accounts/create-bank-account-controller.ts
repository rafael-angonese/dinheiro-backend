import { httpStatusCode } from '@/errors/http-status-code';
import { PrismaBankAccountsRepository } from '@/repositories/prisma/prisma-bank-accounts-repository';
import { CreateBankAccountService } from '@/services/bank-accounts/create-bank-account-service';
import { createBankAccountValidator } from '@/validators/bank-acounts/create-bank-account-validator';
import { NextFunction, Request, Response } from 'express';

export async function create(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { name, balance } = createBankAccountValidator.parse(
      request.body,
    );
    const { user_id } = request.auth;

    const bankAccountsRepository = new PrismaBankAccountsRepository();
    const useCase = new CreateBankAccountService(bankAccountsRepository);

    const { bankAccount } = await useCase.execute({
      name,
      balance,
      userId: user_id,
    });

    return response.status(httpStatusCode.created).json({
      data: bankAccount,
    });
  } catch (error) {
    next(error);
  }
}
