import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository';
import { DestroyTransactionService } from '@/services/transactions/destroy-transaction-service';
import { uuidValidator } from '@/validators/uuid-validator';
import { NextFunction, Request, Response } from 'express';

export async function destroy(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { id } = uuidValidator.parse(request.params);

    const transactionsRepository = new PrismaTransactionsRepository();
    const useCase = new DestroyTransactionService(transactionsRepository);

    await useCase.execute({
      id,
    });

    return response.status(200).send();
  } catch (error) {
    next(error);
  }
}
