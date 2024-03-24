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
    const { qs, page, perPage } = listBankAccountsValidator.parse(
      request.query,
    );

    const bankAccountsRepository = new PrismaBankAccountsRepository();
    const useCase = new ListBankAccountsService(bankAccountsRepository);

    const { data, meta } = await useCase.execute({
      qs,
      page,
      perPage
    });

    return response.json({
      data,
      meta,
    });
  } catch (error) {
    next(error);
  }
}
