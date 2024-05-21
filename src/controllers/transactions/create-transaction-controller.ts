import { httpStatusCode } from '@/errors/http-status-code';
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
      bankAccountId,
      files,
    } = createTransactionValidator.parse(request.body);

    const { userId } = request.auth;

    const transactionsRepository = new PrismaTransactionsRepository();
    const useCase = new CreateTransactionService(transactionsRepository);

    const { transaction} = await useCase.execute({
      date,
      description,
      amount,
      type,
      categoryId,
      userId,
      bankAccountId,
      files,
    });

    return response.status(httpStatusCode.created).json({
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
}
