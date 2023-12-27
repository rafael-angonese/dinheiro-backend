import { PrismaBankAccountsRepository } from '@/repositories/prisma/prisma-bank-accounts-repository';
import { UpdateBankAccountService } from '@/services/bank-accounts/update-bank-account-service';
import { updateBankAccountValidator } from '@/validators/bank-acounts/update-account-validator';
import { uuidValidator } from '@/validators/uuid-validator';
import { NextFunction, Request, Response } from 'express';

export async function update(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { id } = uuidValidator.parse(request.params);
    const { name, balance } = updateBankAccountValidator.parse(request.body);

    const bankAccountsRepository = new PrismaBankAccountsRepository();
    const useCase = new UpdateBankAccountService(bankAccountsRepository);

    const { bankAccount } = await useCase.execute(id, { name, balance });

    return response.json({
      data: bankAccount,
    });
  } catch (error) {
    next(error);
  }
}
