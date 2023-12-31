import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository';
import { GetTransactionService } from '@/services/transactions/get-transaction-service';
import { uuidValidator } from '@/validators/uuid-validator';
import { NextFunction, Request, Response } from 'express';

export async function show(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { id } = uuidValidator.parse(request.params);

    const transactionsRepository = new PrismaTransactionsRepository();
    const useCase = new GetTransactionService(transactionsRepository);

    const { transaction } = await useCase.execute({
      id,
    });

    return response.json({
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
}
