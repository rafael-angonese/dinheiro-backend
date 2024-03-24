import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository';
import { UpdateTransactionService } from '@/services/transactions/update-transaction-service';
import { updateTransactionValidator } from '@/validators/transactions/update-transaction-validator';
import { uuidValidator } from '@/validators/uuid-validator';
import { NextFunction, Request, Response } from 'express';

export async function update(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { id } = uuidValidator.parse(request.params);

    const {
      date,
      description,
      amount,
      type,
      categoryId,
      bankAccountId,
    } = updateTransactionValidator.parse(request.body);

    const transactionsRepository = new PrismaTransactionsRepository();
    const useCase = new UpdateTransactionService(transactionsRepository);

    const { transaction } = await useCase.execute(id, {
      date,
      description,
      amount,
      type,
      categoryId,
      bankAccountId,
    });

    return response.json({
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
}
