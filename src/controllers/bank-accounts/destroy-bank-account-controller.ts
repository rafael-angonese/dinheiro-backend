import { PrismaBankAccountsRepository } from '@/repositories/prisma/prisma-bank-accounts-repository';
import { DestroyBankAccountService } from '@/services/bank-accounts/destroy-bank-account-service';
import { uuidValidator } from '@/validators/uuid-validator';
import { NextFunction, Request, Response } from 'express';

export async function destroy(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { id } = uuidValidator.parse(request.params);

    const bankAccountsRepository = new PrismaBankAccountsRepository();
    const useCase = new DestroyBankAccountService(bankAccountsRepository);

    await useCase.execute({
      id,
    });

    return response.status(200).send();
  } catch (error) {
    next(error);
  }
}
