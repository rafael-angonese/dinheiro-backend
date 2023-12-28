import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository';
import { ListTransactionsService } from '@/services/transactions/list-transactions-service';
import { listTransactionsValidator } from '@/validators/transactions/list-transactions-validator';
import { NextFunction, Request, Response } from 'express';

export async function list(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { q, page, accountId, userId, startDate, endDate } =
      listTransactionsValidator.parse(request.query);

    const transactionsRepository = new PrismaTransactionsRepository();
    const useCase = new ListTransactionsService(transactionsRepository);

    const { transactions } = await useCase.execute({
      query: q,
      page,
      accountId,
      userId,
      startDate,
      endDate,
    });

    return response.json({
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
}
