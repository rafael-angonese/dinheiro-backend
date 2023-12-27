import { PrismaBankAccountsRepository } from '@/repositories/prisma/prisma-bank-accounts-repository';
import { GetBankAccountService } from '@/services/bank-accounts/get-bank-account-service';
import { uuidValidator } from '@/validators/uuid-validator';
import { NextFunction, Request, Response } from 'express';

export async function show(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { id } = uuidValidator.parse(request.params);

    const bankAccountsRepository = new PrismaBankAccountsRepository();
    const useCase = new GetBankAccountService(bankAccountsRepository);

    const { bankAccount } = await useCase.execute({
      id,
    });

    return response.json({
      data: bankAccount,
    });
  } catch (error) {
    next(error);
  }
}
