import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository';
import { CreateTransactionService } from '@/services/transactions/create-transaction-service';
import { createTransactionValidator } from '@/validators/transactions/create-transaction-validator';
import { NextFunction, Request, Response } from 'express';

export async function create(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const {
      date,
      description,
      amount,
      type,
      categoryId,
      accountId,
      bankAccountId,
    } = createTransactionValidator.parse(request.body);

    const { user_id } = request.auth;

    const transactionsRepository = new PrismaTransactionsRepository();
    const useCase = new CreateTransactionService(transactionsRepository);

    const transaction = await useCase.execute({
      date,
      description,
      amount,
      type,
      categoryId,
      userId: user_id,
      accountId,
      bankAccountId,
    });

    return response.json(transaction);
  } catch (error) {
    next(error);
  }
}
