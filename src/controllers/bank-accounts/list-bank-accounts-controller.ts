import { PrismaBankAccountsRepository } from '@/repositories/prisma/prisma-bank-accounts-repository';
import { ListBankAccountsService } from '@/services/bank-accounts/list-bank-accounts-service';
import { listBankAccountsValidator } from '@/validators/bank-acounts/list-bank-accounts-validator';
import { NextFunction, Request, Response } from 'express';

export async function list(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { q, page, accountId } = listBankAccountsValidator.parse(
      request.query,
    );
    const { user_id } = request.auth;

    const bankAccountsRepository = new PrismaBankAccountsRepository();
    const useCase = new ListBankAccountsService(bankAccountsRepository);

    const { bankAccounts } = await useCase.execute({
      query: q,
      page,
      userId: user_id,
      accountId: accountId,
    });

    return response.json({
      data: bankAccounts,
    });
  } catch (error) {
    next(error);
  }
}
