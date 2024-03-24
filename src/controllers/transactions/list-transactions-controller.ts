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
    const { qs, page, perPage, userId, startDate, endDate } =
      listTransactionsValidator.parse(request.query);

    const transactionsRepository = new PrismaTransactionsRepository();
    const useCase = new ListTransactionsService(transactionsRepository);

    const { data, meta } = await useCase.execute({
      qs,
      page,
      perPage,
      userId,
      startDate,
      endDate,
    });

    return response.json({
      data,
      meta,
    });
  } catch (error) {
    next(error);
  }
}
